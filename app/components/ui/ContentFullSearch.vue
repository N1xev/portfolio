<script setup lang="ts">
const { data: navigation } = await useAsyncData("navigation", () =>
  queryCollectionNavigation("blog"),
);
const { data: files } = await useAsyncData("search", () =>
  queryCollectionSearchSections("blog"),
);

const searchTerm = ref("");
</script>

<template>
  <ClientOnly>
    <LazyUContentSearch
      v-model:search-term="searchTerm"
      shortcut="meta_k"
      :files="files"
      :navigation="navigation"
      :fuse="{ resultLimit: 20 }"
      :overlay="true"
    />
  </ClientOnly>
</template>

