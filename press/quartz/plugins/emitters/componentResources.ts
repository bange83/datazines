import { createHash } from "crypto"
import { FullSlug, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"

// @ts-ignore
import spaRouterScript from "../../components/scripts/spa.inline"
// @ts-ignore
import popoverScript from "../../components/scripts/popover.inline"
import baseStyles from "../../styles/base.scss"
import customStyles from "../../styles/custom.scss"
import popoverStyle from "../../components/styles/popover.scss"
import { BuildCtx } from "../../util/ctx"
import { QuartzComponent } from "../../components/types"
import { normalizeResource } from "../../util/resources"
import { componentRegistry } from "../../components/registry"
import {
  googleFontHref,
  googleFontSubsetHref,
  joinStyles,
  processGoogleFonts,
} from "../../util/theme"
import { Features, transform } from "lightningcss"
import { transform as transpile } from "esbuild"
import { write } from "./helpers"

function hashContent(content: string | Buffer): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 8)
}

type ComponentResources = {
  css: string[]
  beforeDOMLoaded: string[]
  afterDOMLoaded: string[]
  componentCssStrings: Set<string>
}

function getComponentResources(ctx: BuildCtx): ComponentResources {
  const allComponents: Set<QuartzComponent> = new Set()

  for (const emitter of ctx.cfg.plugins.emitters) {
    const components = emitter.getQuartzComponents?.(ctx) ?? []
    for (const component of components) {
      allComponents.add(component)
    }
  }

  for (const component of componentRegistry.getAllComponents()) {
    allComponents.add(component)
  }

  const componentResources = {
    css: new Set<string>(),
    beforeDOMLoaded: new Set<string>(),
    afterDOMLoaded: new Set<string>(),
  }

  for (const component of allComponents) {
    const { css, beforeDOMLoaded, afterDOMLoaded } = component
    for (const c of normalizeResource(css)) componentResources.css.add(c)
    for (const b of normalizeResource(beforeDOMLoaded)) componentResources.beforeDOMLoaded.add(b)
    for (const a of normalizeResource(afterDOMLoaded)) componentResources.afterDOMLoaded.add(a)
  }

  return {
    css: [...componentResources.css],
    beforeDOMLoaded: [...componentResources.beforeDOMLoaded],
    afterDOMLoaded: [...componentResources.afterDOMLoaded],
    componentCssStrings: new Set(componentResources.css),
  }
}

async function joinScripts(scripts: string[]): Promise<string> {
  // wrap with iife to prevent scope collision
  const script = scripts.map((script) => `(function () {${script}})();`).join("\n")

  // minify with esbuild
  const res = await transpile(script, {
    minify: true,
  })

  return res.code
}

function addGlobalPageResources(ctx: BuildCtx, componentResources: ComponentResources) {
  const cfg = ctx.cfg.configuration

  // popovers
  if (cfg.enablePopovers) {
    componentResources.afterDOMLoaded.push(popoverScript)
    componentResources.css.push(popoverStyle)
  }

  // datazines: each ## Page N is a paper leaf. Also flatten Quartz's nested SVG paths.
  componentResources.afterDOMLoaded.push(`
    function wrapSketchbookLeaves() {
      const article =
        document.querySelector("article .markdown-preview-view") ||
        document.querySelector("article");
      if (!article) return;
      for (const img of article.querySelectorAll("img")) {
        const src = img.getAttribute("src");
        if (!src || !src.includes("./../")) continue;
        img.setAttribute(
          "src",
          src
            .replace("../.././../assets/", "../../assets/")
            .replace(".././../assets/", "../assets/"),
        );
      }
      if (article.querySelector(":scope > section.leaf")) return;
      const nodes = Array.from(article.childNodes);
      if (!nodes.length) return;
      const leaves = [];
      let current = document.createElement("section");
      current.className = "leaf hero-leaf";
      const push = () => {
        if (current.childNodes.length > 0) leaves.push(current);
      };
      for (const node of nodes) {
        const el = node.nodeType === 1 ? node : null;
        if (el && el.tagName === "H2") {
          push();
          current = document.createElement("section");
          current.className = "leaf";
          current.appendChild(node);
        } else if (el && el.tagName === "HR") {
          continue;
        } else {
          current.appendChild(node);
        }
      }
      push();
      if (leaves.length) article.replaceChildren(...leaves);
    }

    function samePath(href, path) {
      try {
        const u = new URL(href, location.href);
        const strip = (p) =>
          p.replace(/\\/index\\.html$/, "").replace(/\\/index$/, "").replace(/\\/$/, "") || "/";
        return strip(u.pathname) === strip(path);
      } catch {
        return false;
      }
    }

    function childLis(parent) {
      return [...parent.children].filter(
        (n) => n.tagName === "LI" && !n.classList.contains("overflow-end"),
      );
    }

    function groupUl(li) {
      return li.querySelector(":scope > .folder-outer ul");
    }

    function folderName(li) {
      const el = li.querySelector(":scope > .folder-container .folder-title");
      return el ? el.textContent.trim() : "";
    }

    function directFiles(li) {
      const group = groupUl(li);
      if (!group) return [];
      return [...group.querySelectorAll(":scope > li > a.nav-file-title")];
    }

    function directSubfolders(li) {
      const group = groupUl(li);
      if (!group) return [];
      return childLis(group).filter((c) => c.querySelector(":scope > .folder-container"));
    }

    function first01Link(li) {
      const files = directFiles(li);
      const numbered = files.find((a) => /^\s*01(\b|[\s–-])/.test(a.textContent || ""));
      if (numbered) return numbered;
      for (const sub of directSubfolders(li)) {
        const nested = first01Link(sub);
        if (nested) return nested;
      }
      return files[0] || null;
    }

    function retargetFolderTabs(ul) {
      ul.querySelectorAll("li").forEach((li) => {
        const tab = li.querySelector(":scope > .folder-container a.folder-button");
        if (!tab) return;
        const dest = first01Link(li);
        const href = dest && dest.getAttribute("href");
        if (href) tab.setAttribute("href", href);
      });
    }

    function ensureRow(explorer, className) {
      let el = explorer.querySelector(":scope > ." + className);
      if (!el) {
        el = document.createElement("nav");
        el.className = className;
        explorer.appendChild(el);
      }
      return el;
    }

    function chipFrom(a) {
      const chip = a.cloneNode(true);
      chip.className = "sub-chip" + (a.classList.contains("is-current") ? " is-current" : "");
      return chip;
    }

    function styleTopNav(tries = 0) {
      const explorer = document.querySelector(".explorer");
      const ul = explorer && explorer.querySelector(".explorer-ul");
      const top = ul
        ? childLis(ul).filter((li) => {
            if (!li.querySelector(":scope > .folder-container")) return false;
            const name = folderName(li).toLowerCase();
            return name !== "impressum" && name !== "datenschutz";
          })
        : [];
      if (!explorer || top.length === 0) {
        if (tries < 40) setTimeout(() => styleTopNav(tries + 1), 50);
        return;
      }
      explorer.classList.add("is-top-nav");
      retargetFolderTabs(ul);
      const path = location.pathname;
      ul.querySelectorAll("a.nav-file-title").forEach((a) => {
        a.classList.toggle("is-current", samePath(a.href, path));
      });
      const activeShelf = top.find((li) => li.querySelector("a.is-current"));
      top.forEach((li) => li.classList.toggle("is-active-shelf", li === activeShelf));

      const families = ensureRow(explorer, "family-nav");
      const chips = ensureRow(explorer, "sub-nav");
      const content = explorer.querySelector(".explorer-content");
      if (content) {
        content.after(families);
        families.after(chips);
      }
      families.replaceChildren();
      chips.replaceChildren();

      if (!activeShelf) {
        families.hidden = true;
        chips.hidden = true;
        return;
      }

      const subfolders = directSubfolders(activeShelf);
      if (subfolders.length) {
        families.hidden = false;
        let activeFamily = subfolders.find((sub) => sub.querySelector("a.is-current")) || subfolders[0];
        subfolders.forEach((sub) => {
          const dest = first01Link(sub);
          const a = document.createElement("a");
          a.className = "family-tab" + (sub === activeFamily ? " is-current" : "");
          a.href = dest ? dest.getAttribute("href") : "#";
          a.textContent = folderName(sub);
          families.append(a);
        });
        const familyFiles = directFiles(activeFamily);
        chips.hidden = familyFiles.length === 0;
        familyFiles.forEach((a) => chips.append(chipFrom(a)));
      } else {
        families.hidden = true;
        const files = directFiles(activeShelf);
        chips.hidden = files.length === 0;
        files.forEach((a) => chips.append(chipFrom(a)));
      }
    }

    document.addEventListener("nav", wrapSketchbookLeaves);
    document.addEventListener("nav", () => styleTopNav());
    wrapSketchbookLeaves();
    styleTopNav();
  `)

  if (cfg.analytics?.provider === "google") {
    const tagId = cfg.analytics.tagId
    componentResources.afterDOMLoaded.push(`
      const gtagScript = document.createElement('script');
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=${tagId}';
      gtagScript.defer = true;
      gtagScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', '${tagId}', { send_page_view: false });
        gtag('event', 'page_view', { page_title: document.title, page_location: location.href });
        document.addEventListener('nav', () => {
          gtag('event', 'page_view', { page_title: document.title, page_location: location.href });
        });
      };
      
      document.head.appendChild(gtagScript);
    `)
  } else if (cfg.analytics?.provider === "plausible") {
    const plausibleHost = cfg.analytics.host ?? "https://plausible.io"
    componentResources.afterDOMLoaded.push(`
      const plausibleScript = document.createElement('script');
      plausibleScript.src = '${plausibleHost}/js/script.manual.js';
      plausibleScript.setAttribute('data-domain', location.hostname);
      plausibleScript.defer = true;
      plausibleScript.onload = () => {
        window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
        plausible('pageview');
        document.addEventListener('nav', () => {
          plausible('pageview');
        });
      };

      document.head.appendChild(plausibleScript);
    `)
  } else if (cfg.analytics?.provider === "umami") {
    componentResources.afterDOMLoaded.push(`
      const umamiScript = document.createElement("script");
      umamiScript.src = "${cfg.analytics.host ?? "https://analytics.umami.is"}/script.js";
      umamiScript.setAttribute("data-website-id", "${cfg.analytics.websiteId}");
      umamiScript.setAttribute("data-auto-track", "true");
      umamiScript.defer = true;

      document.head.appendChild(umamiScript);
    `)
  } else if (cfg.analytics?.provider === "goatcounter") {
    componentResources.afterDOMLoaded.push(`
      const goatcounterScriptPre = document.createElement('script');
      goatcounterScriptPre.textContent = \`
        window.goatcounter = { no_onload: true };
      \`;
      document.head.appendChild(goatcounterScriptPre);

      const endpoint = "https://${cfg.analytics.websiteId}.${cfg.analytics.host ?? "goatcounter.com"}/count";
      const goatcounterScript = document.createElement('script');
      goatcounterScript.src = "${cfg.analytics.scriptSrc ?? "https://gc.zgo.at/count.js"}";
      goatcounterScript.defer = true;
      goatcounterScript.setAttribute('data-goatcounter', endpoint);
      goatcounterScript.onload = () => {
        window.goatcounter.endpoint = endpoint;
        goatcounter.count({ path: location.pathname });
        document.addEventListener('nav', () => {
          goatcounter.count({ path: location.pathname });
        });
      };

      document.head.appendChild(goatcounterScript);
    `)
  } else if (cfg.analytics?.provider === "posthog") {
    componentResources.afterDOMLoaded.push(`
      const posthogScript = document.createElement("script");
      posthogScript.innerHTML= \`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('${cfg.analytics.apiKey}', {
        api_host: '${cfg.analytics.host ?? "https://app.posthog.com"}',
        capture_pageview: false,
      });
      document.addEventListener('nav', () => {
        posthog.capture('$pageview', { path: location.pathname });
      })\`

      document.head.appendChild(posthogScript);
    `)
  } else if (cfg.analytics?.provider === "tinylytics") {
    const siteId = cfg.analytics.siteId
    componentResources.afterDOMLoaded.push(`
      const tinylyticsScript = document.createElement('script');
      tinylyticsScript.src = 'https://tinylytics.app/embed/${siteId}.js?spa';
      tinylyticsScript.defer = true;
      tinylyticsScript.onload = () => {
        window.tinylytics.triggerUpdate();
        document.addEventListener('nav', () => {
          window.tinylytics.triggerUpdate();
        });
      };
      
      document.head.appendChild(tinylyticsScript);
    `)
  } else if (cfg.analytics?.provider === "cabin") {
    componentResources.afterDOMLoaded.push(`
      const cabinScript = document.createElement("script")
      cabinScript.src = "${cfg.analytics.host ?? "https://scripts.withcabin.com"}/hello.js"
      cabinScript.defer = true
      document.head.appendChild(cabinScript)
    `)
  } else if (cfg.analytics?.provider === "clarity") {
    componentResources.afterDOMLoaded.push(`
      const clarityScript = document.createElement("script")
      clarityScript.innerHTML= \`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.defer=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${cfg.analytics.projectId}");\`
      document.head.appendChild(clarityScript)
    `)
  } else if (cfg.analytics?.provider === "matomo") {
    componentResources.afterDOMLoaded.push(`
      const matomoScript = document.createElement("script");
      matomoScript.innerHTML = \`
      let _paq = window._paq = window._paq || [];

      // Track SPA navigation
      // https://developer.matomo.org/guides/spa-tracking
      document.addEventListener("nav", () => {
        _paq.push(['setCustomUrl', location.pathname]);
        _paq.push(['setDocumentTitle', document.title]);
        _paq.push(['trackPageView']);
      });

      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        const u="//${cfg.analytics.host}/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', ${cfg.analytics.siteId}]);
        const d=document, g=d.createElement('script'), s=d.getElementsByTagName
('script')[0];
        g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
      \`
      document.head.appendChild(matomoScript);
    `)
  } else if (cfg.analytics?.provider === "vercel") {
    /**
     * script from {@link https://vercel.com/docs/analytics/quickstart?framework=html#add-the-script-tag-to-your-site|Vercel Docs}
     */
    componentResources.beforeDOMLoaded.push(`
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    `)
    componentResources.afterDOMLoaded.push(`
      const vercelInsightsScript = document.createElement("script")
      vercelInsightsScript.src = "/_vercel/insights/script.js"
      vercelInsightsScript.defer = true
      document.head.appendChild(vercelInsightsScript)
    `)
  } else if (cfg.analytics?.provider === "rybbit") {
    componentResources.afterDOMLoaded.push(`
      const rybbitScript = document.createElement("script");
      rybbitScript.src = "${cfg.analytics.host ?? "https://app.rybbit.io"}/api/script.js";
      rybbitScript.setAttribute("data-site-id", "${cfg.analytics.siteId}");
      rybbitScript.async = true;
      rybbitScript.defer = true;

      document.head.appendChild(rybbitScript);
    `)
  }

  if (cfg.enableSPA) {
    componentResources.afterDOMLoaded.push(spaRouterScript)
  } else {
    componentResources.afterDOMLoaded.push(`
      window.spaNavigate = (url, _) => window.location.assign(url)
      window.addCleanup = () => {}
      const event = new CustomEvent("nav", { detail: { url: document.body.dataset.slug } })
      document.dispatchEvent(event)
    `)
  }
}

// This emitter should not update the `resources` parameter. If it does, partial
// rebuilds may not work as expected.
export const ComponentResources: QuartzEmitterPlugin = () => {
  return {
    name: "ComponentResources",
    async *emit(ctx, _content, resources) {
      const cfg = ctx.cfg.configuration
      // component specific scripts and styles
      const componentResources = getComponentResources(ctx)
      let googleFontsStyleSheet = ""
      if (cfg.theme.fontOrigin === "local") {
        // let the user do it themselves in css
      } else if (cfg.theme.fontOrigin === "googleFonts" && !cfg.theme.cdnCaching) {
        // when cdnCaching is true, we link to google fonts in Head.tsx
        const theme = ctx.cfg.configuration.theme
        const response = await fetch(googleFontHref(theme))
        googleFontsStyleSheet = await response.text()

        if (theme.typography.title) {
          const title = ctx.cfg.configuration.pageTitle
          const response = await fetch(googleFontSubsetHref(theme, title))
          googleFontsStyleSheet += `\n${await response.text()}`
        }

        if (!cfg.baseUrl) {
          throw new Error(
            "baseUrl must be defined when using Google Fonts without cfg.theme.cdnCaching",
          )
        }

        const { processedStylesheet, fontFiles } = await processGoogleFonts(
          googleFontsStyleSheet,
          cfg.baseUrl,
        )
        googleFontsStyleSheet = processedStylesheet

        // Download and save font files
        for (const fontFile of fontFiles) {
          const res = await fetch(fontFile.url)
          if (!res.ok) {
            throw new Error(`Failed to fetch font ${fontFile.filename}`)
          }

          const buf = await res.arrayBuffer()
          yield write({
            ctx,
            slug: joinSegments("static", "fonts", fontFile.filename) as FullSlug,
            ext: `.${fontFile.extension}`,
            content: Buffer.from(buf),
          })
        }
      }

      // important that this goes *after* component scripts
      // as the "nav" event gets triggered here and we should make sure
      // that everyone else had the chance to register a listener for it
      addGlobalPageResources(ctx, componentResources)

      const useHashing = !ctx.argv.serve

      // Separate global CSS (added by addGlobalPageResources, e.g. popover CSS)
      // from component CSS. Global CSS was pushed onto componentResources.css
      // AFTER getComponentResources() returned, so it's not in componentCssStrings.
      const globalCss = componentResources.css.filter(
        (c) => !componentResources.componentCssStrings.has(c),
      )

      // Core CSS: theme + fonts + global CSS + base styles (no per-component CSS)
      const quartzBase = joinStyles(
        ctx.cfg.configuration.theme,
        googleFontsStyleSheet,
        ...globalCss,
        baseStyles,
      )
      const stylesheet = `@layer quartz-base {\n${quartzBase}\n}\n${customStyles}`

      const prescript = await joinScripts(componentResources.beforeDOMLoaded)

      let postscript: string
      if (!useHashing) {
        // Serve mode: monolithic IIFE bundle for fast rebuilds
        postscript = await joinScripts(componentResources.afterDOMLoaded)
      } else {
        // Production: emit each afterDOMLoaded script as an individual cached file,
        // then generate an orchestrator that imports them with correct ordering.
        // The last script is always the SPA router (pushed last by addGlobalPageResources),
        // which must execute after all other scripts register their nav listeners.
        const scripts = componentResources.afterDOMLoaded
        const scriptFilenames: string[] = []

        for (let i = 0; i < scripts.length; i++) {
          const hash = hashContent(scripts[i])
          const slug = `static/scripts/script-${i}-${hash}`
          const filename = `${slug}.js`
          scriptFilenames.push(filename)

          yield write({
            ctx,
            slug: slug as FullSlug,
            ext: ".js",
            content: scripts[i],
          })
        }

        // Generate orchestrator: import all component scripts in parallel,
        // then import SPA router last (it dispatches the initial nav event)
        const componentImports = scriptFilenames
          .slice(0, -1)
          .map((f) => `import("./${f}")`)
          .join(",\n  ")

        const spaImport = `await import("./${scriptFilenames[scriptFilenames.length - 1]}");`

        postscript = [`await Promise.all([\n  ${componentImports}\n]);`, spaImport]
          .filter(Boolean)
          .join("\n")
      }

      const lightningTargets = {
        safari: (15 << 16) | (6 << 8), // 15.6
        ios_saf: (15 << 16) | (6 << 8), // 15.6
        edge: 115 << 16,
        firefox: 102 << 16,
        chrome: 109 << 16,
      }

      const cssContent = transform({
        filename: "index.css",
        code: Buffer.from(stylesheet),
        minify: true,
        targets: lightningTargets,
        include: Features.MediaQueries,
      }).code.toString()

      const cssStringToFilename = new Map<string, string>()
      for (const cssString of componentResources.componentCssStrings) {
        if (cssStringToFilename.has(cssString)) continue

        const wrapped = `@layer quartz-base {\n${cssString}\n}`
        const minified = transform({
          filename: "component.css",
          code: Buffer.from(wrapped),
          minify: true,
          targets: lightningTargets,
          include: Features.MediaQueries,
        }).code.toString()

        const hash = hashContent(minified)
        const slug = `component-${hash}`
        const filename = `${slug}.css`
        cssStringToFilename.set(cssString, filename)

        yield write({
          ctx,
          slug: slug as FullSlug,
          ext: ".css",
          content: minified,
        })
      }

      ctx.componentCssMap = cssStringToFilename

      // Extract inline CSS/JS from plugin externalResources() into external files.
      // This prevents large inline payloads (e.g. theme CSS) from being duplicated
      // into every HTML page's <head>.
      const extractedInlineResources = new Map<string, string>()
      for (const cssResource of resources.css) {
        if (!(cssResource.inline ?? false)) continue

        let output: string
        try {
          output = transform({
            filename: "plugin-resource.css",
            code: Buffer.from(cssResource.content),
            minify: true,
            targets: lightningTargets,
            include: Features.MediaQueries,
          }).code.toString()
        } catch {
          output = cssResource.content
        }

        const hash = hashContent(output)
        const slug = `static/resource-style-${hash}`
        const filename = `${slug}.css`
        extractedInlineResources.set(cssResource.content, filename)

        yield write({
          ctx,
          slug: slug as FullSlug,
          ext: ".css",
          content: output,
        })
      }

      for (const jsResource of resources.js) {
        if (jsResource.contentType !== "inline") continue

        const minified = await joinScripts([jsResource.script])
        const hash = hashContent(minified)
        const loadTimePrefix = jsResource.loadTime === "beforeDOMReady" ? "before" : "after"
        const slug = `static/resource-${loadTimePrefix}-${hash}`
        const filename = `${slug}.js`
        extractedInlineResources.set(jsResource.script, filename)

        yield write({
          ctx,
          slug: slug as FullSlug,
          ext: ".js",
          content: minified,
        })
      }

      ctx.extractedInlineResources = extractedInlineResources

      const cssHash = useHashing ? hashContent(cssContent) : null
      const prescriptHash = useHashing ? hashContent(prescript) : null
      const postscriptHash = useHashing ? hashContent(postscript) : null

      const cssSlug = cssHash ? `index-${cssHash}` : "index"
      const prescriptSlug = prescriptHash ? `prescript-${prescriptHash}` : "prescript"
      const postscriptSlug = postscriptHash ? `postscript-${postscriptHash}` : "postscript"

      ctx.hashedResourceNames = {
        "index.css": `${cssSlug}.css`,
        "prescript.js": `${prescriptSlug}.js`,
        "postscript.js": `${postscriptSlug}.js`,
      }

      yield write({
        ctx,
        slug: cssSlug as FullSlug,
        ext: ".css",
        content: cssContent,
      })

      yield write({
        ctx,
        slug: prescriptSlug as FullSlug,
        ext: ".js",
        content: prescript,
      })

      yield write({
        ctx,
        slug: postscriptSlug as FullSlug,
        ext: ".js",
        content: postscript,
      })
    },
    async *partialEmit() {},
  }
}
