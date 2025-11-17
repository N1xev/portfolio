<script setup lang="ts">
const links = ref([
  {
    label: "Github",
    to: "https://github.com/N1xev",
    icon: "i-lucide-github",
    color: "neutral",
    variant: "ghost",
    target: "_blank",
  },
  {
    label: "My Blog",
    to: "/blog",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-right",
  },
]);
</script>

<template>
  <section id="home" class="flex flex-col h-full items-center justify-center">
    <UPageHero
      title="Consider this your invitation."
      description="Software engineer from Egypt. Building scalable applications that solve real problems with clean, maintainable code and great user experiences."
      :links="links"
    />
    <UiMarquee />
  </section>
</template>
