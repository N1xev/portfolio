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
const baseUrl = "https://samouly.is-a.dev";
const route = useRoute();

useSeoMeta({
  title: 'Alaa El-Samouly',
  ogTitle: 'Alaa El-Samouly',
  twitterTitle: 'Alaa El-Samouly',
  description: "a software engineer from Egypt.",
  ogDescription: "a software engineer from Egypt.",
  twitterDescription: "a software engineer from Egypt.",
  themeColor: '#030712',
  ogUrl: baseUrl + route.path,
  ogImage: `${baseUrl}/samouly-banner.png`,
  twitterCard: 'summary_large_image',
  twitterImage: `${baseUrl}/samouly-banner.png`
})

useHead({
  link: [
    {rel: 'canonical', href: baseUrl + route.path}
  ]
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
