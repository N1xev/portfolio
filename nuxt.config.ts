import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@nuxthub/core",
    "nuxt-studio",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    githubToken: process.env.NUXT_GITHUB_TOKEN,
    public: {
      githubUsername: process.env.NUXT_PUBLIC_GITHUB_USERNAME,
      siteUrl: "https://samouly.is-a.dev",
    },
  },
  hub: {
    database: true,
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["lua", "go", "nix"],
        },
      },
    },
    preview: {
      api: "https://api.nuxt.studio",
    },
  },
  studio: {
    repository: {
      provider: "github",
      owner: "N1xev",
      repo: "portfolio",
      branch: "main",
      rootDir: 'blog'
    },
    route: '/nahody',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        style: "scroll-behavior: smooth",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/samouly.png" },

      ],
    },
    pageTransition: { name: "page", mode: "in-out" },
  },
});