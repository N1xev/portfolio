<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "#home",
    active: route.hash === "#home",
  },
  {
    label: "About",
    to: "#about",
    active: route.hash === "#about",
  },
  {
    label: "Projects",
    to: "#projects",
    active: route.hash === "#projects",
  },
  {
    label: "Contact",
    to: "#contact",
    active: route.hash === "#contact",
  },
  {
    label: "Blog",
    to: "/blog",
    icon: "i-lucide-newspaper",
    active: route.path.startsWith("/blog"),
    variant: "subtle",
    color: "error",
  },
]);
</script>

<template>
  <div
    class="sticky top-0 z-50 bottom-0 border-b border-dashed border-gray-300 dark:border-gray-700"
  >
    <UHeader
      mode="drawer"
      class="container border-x border-b-0 border-dashed border-gray-300 dark:border-gray-700 max-w-6xl justify-between items-center mx-auto"
    >
      <template #title> Alaa Elsamouly </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <UiColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="gray"
            variant="ghost"
            to="https://github.com/N1xev/portfolio"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>
  </div>
</template>
