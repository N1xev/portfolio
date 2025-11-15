<template>
  <UApp>
    <HeaderComp />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <FooterComp />
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
