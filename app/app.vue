<template>
  <UApp>
  <UiContentFullSearch />
  <LayoutHeader />
    <UMain>
      <NuxtLayout>
        <NuxtPage  />
      </NuxtLayout>
    </UMain>
    <LayoutFooter />
  </UApp>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

updateAppConfig(appConfig);

useSeoMeta({
  title: 'Alaa El-Samouly',
  ogTitle: 'Alaa El-Samouly',
  twitterTitle: 'Alaa El-Samouly',
  description: "a software engineer from Egypt.",
  ogDescription: "a software engineer from Egypt.",
  twitterDescription: "a software engineer from Egypt.",
  ogUrl: 'https://samouly.dev',
  ogImage: '/samouly-banner.png',
  icon: '/samouly.png',
  twitterCard: '/samouly.png',
  twitterImage: '/samouly-banner.png'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2rem);
 
}
</style>
