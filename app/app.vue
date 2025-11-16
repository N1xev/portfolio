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
  description: 'I&apos;m Alaa, a 19 year old Web developer from Egypt.',
  ogDescription: 'I&apos;m Alaa, a 19 year old Web developer from Egypt.',
  ogImage: '/samouly.png',
  twitterCard: '/samouly.png',
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
