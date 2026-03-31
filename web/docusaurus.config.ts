import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Hookstorm",
  tagline:
    "Hookstorm is a collection of customizable, reusable React hooks that streamline state management, DOM interaction, and complex logic in React applications.",
  favicon: "img/favicon.svg",

  // Production URL — GitHub Pages default.
  // Custom domain eklenince: url'i domain'e, baseUrl'i "/"'e çek ve web/static/CNAME dosyası oluştur.
  url: "https://gokhangunduz.github.io",
  baseUrl: "/hookstorm/",

  organizationName: "gokhangunduz", // Usually your GitHub org/user name.
  projectName: "hookstorm", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/gokhangunduz/hookstorm/edit/main/web/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Hookstorm",
      logo: {
        alt: "Hookstorm Logo",
        src: "img/logo.svg",
        srcDark: "img/logo.dark.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/gokhangunduz/hookstorm",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Installation", to: "/docs/installation" },
            { label: "Hooks", to: "/docs/hooks" },
          ],
        },
        {
          title: "Library",
          items: [
            { label: "About", to: "/docs/about" },
            { label: "Contact", to: "/docs/contact" },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/gokhangunduz/hookstorm",
            },
            {
              label: "npm",
              href: "https://www.npmjs.com/package/hookstorm",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "MIT License",
              href: "https://github.com/gokhangunduz/hookstorm/blob/main/LICENSE",
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Hookstorm · Made with <span style="color:#ef4444">♥</span> in Ankara`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
