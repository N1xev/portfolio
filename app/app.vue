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

const appConfig = useAppConfig()

updateAppConfig(appConfig)

</script>
