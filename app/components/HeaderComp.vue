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
]);
</script>

<template>
  <div class="sticky top-0 z-50 bottom-0 border-b border-dashed border-default">
    <UHeader
      class="container border-x border-b-0 border-dashed border-default max-w-5xl justify-between items-center mx-auto"
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
