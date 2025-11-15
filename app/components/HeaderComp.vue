<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Blog",
    to: "/blog",
    icon: "i-lucide-newspaper",
    active: route.path.startsWith("/blog"),
  },
  {
    label: "Projects",
    to: "/#projects",
    icon: "i-lucide-layout-dashboard",
    active: route.path === ("/projects") || route.hash === "#projects",
  },
  {
    label: "About",
    to: "/#about",
    icon: "i-lucide-info",
    active: route.path === ("/about") || route.hash === "#about",
  },
  {
    label: "Contact",
    to: "/#contact",
    icon: "i-lucide-mail",
    active: route.path === ("/contact") || route.hash === "#contact",
  },
]);
</script>

<template>
  <div class="sticky top-0 z-50 bottom-0 border-b border-dashed   border-gray-300 dark:border-gray-700">
    <UHeader
      mode="drawer"
      class="container border-x border-b-0 border-dashed border-gray-300 dark:border-gray-700 max-w-5xl justify-between items-center mx-auto"
    >
      <template #title> Alaa Elsamouly </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <ColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="gray"
            variant="ghost"
            to="https://github.com/nuxt/ui"
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
