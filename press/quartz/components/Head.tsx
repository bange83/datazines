import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"

export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
  }: QuartzComponentProps) => {
    const isHome = fileData.slug === "index" || fileData.slug === "00-how-to-read-this"
    const fileTitle =
      (typeof fileData.frontmatter?.title === "string" && fileData.frontmatter.title.trim()) ||
      fileData.frontmatter?.title ||
      fileData.slug?.split("/").pop()?.replace(/-/g, " ") ||
      i18n(cfg.locale).propertyDefaults.title

    let title: string
    if (isHome) {
      title = "datazines — a sketchbook for data science"
    } else {
      const base = String(fileTitle).trim()
      title = base.toLowerCase().includes("datazines") ? base : `${base} · datazines`
    }

    let description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    if (description) {
      description = description
        .replace(/^>*\s*\[![^\]]+\](?:[^\n]*\n)?/i, "")
        .replace(/^>+\s*/gm, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, _p1, p2) => p2 || _p1)
        .trim()
    }
    if (!description || description === i18n(cfg.locale).propertyDefaults.description) {
      description = "Short, visual guides to data science: one idea, one picture, and one honest example at a time."
    }

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "datazines.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Canonical & Social URLs
    const canonicalUrl = isHome
      ? `https://${cfg.baseUrl}/`
      : (fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!))
    const socialUrl = canonicalUrl

    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    const coreStylesheet = css[0]?.content
    const coreScript = js.find(
      (r) => r.loadTime === "beforeDOMReady" && r.contentType === "external",
    )

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": isHome ? "WebSite" : "TechArticle",
      "name": title,
      "headline": title,
      "description": description,
      "url": canonicalUrl,
      "image": ogImageDefaultPath,
      "publisher": {
        "@type": "Organization",
        "name": "datazines",
        "url": `https://${cfg.baseUrl}`,
        "logo": {
          "@type": "ImageObject",
          "url": `https://${cfg.baseUrl}/static/icon.png`
        }
      },
      "inLanguage": "en-US"
    }

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="KDPRBxGIh-Ryna8ZJq-yeh4zgVUe7_4ik2LmE9TlGoM" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />

        {coreStylesheet && <link rel="preload" href={coreStylesheet} as="style" />}
        {coreScript && coreScript.contentType === "external" && (
          <link rel="preload" href={coreScript.src} as="script" />
        )}
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        <meta property="og:image" content={ogImageDefaultPath} />
        <meta property="og:image:url" content={ogImageDefaultPath} />
        <meta name="twitter:image" content={ogImageDefaultPath} />
        <meta
          property="og:image:type"
          content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
        />

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />

        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="919f3a01-afc7-4d83-8903-d86ef8fdc4ce"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
