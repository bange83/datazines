import { jsx } from 'preact/jsx-runtime';

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/util/path.ts
function pathToRoot(slug) {
  let rootPath = slug.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  propertyDefaults: {
    title: "Untitled"
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}
var PageTitle = ({ fileData, cfg, displayClass }) => {
  const baseDir = pathToRoot(fileData.slug);
  return /* @__PURE__ */ jsx("h2", {
    class: classNames(displayClass, "page-title"),
    children: /* @__PURE__ */ jsx("a", {
      href: baseDir,
      children: /* @__PURE__ */ jsx("div", {
        class: "logo-wrapper",
        children: /* @__PURE__ */ jsx("img", {
          src: "/assets/zini/zini-logo-drawing.png",
          alt: "datazines.com \u2014 One page = one idea",
          class: "site-logo"
        })
      })
    })
  });
};
PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`;
var PageTitle_default = (() => PageTitle);

export { PageTitle_default as PageTitle };
