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
    description="I'm Alaa, a 19 year old Web developer from Egypt. crafting digital experiences at the intersection of design, technology, and user experience."
    :links="links"
  />
  <UiMarquee />
  </section>
</template>
