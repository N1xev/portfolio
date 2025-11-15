import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
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
  ],
  css: ["~/assets/css/main.css"],

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["lua"],
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

app: {
    head: {
      title: 'Eng.Samouly', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/samouly.png' },
      ],
    },
  },
});
