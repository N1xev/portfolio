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
  ],
  css: ["~/assets/css/main.css"],
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["lua", "go"],
        },
      },
    },
      preview: {
          api: 'https://api.nuxt.studio'
      },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
      experimental: {
          openAPI: true
      }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        style: 'scroll-behavior: smooth'
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/samouly.png" }],
    },
    pageTransition: { name: 'page', mode: 'in-out' },
  },
});