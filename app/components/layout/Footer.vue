<script setup lang="ts">
/*
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[] = [
  {
    label: "Figma Kit",
    to: "https://go.nuxt.com/figma-ui",
    target: "_blank",
  },
  {
    label: "Playground",
    to: "https://stackblitz.com/edit/nuxt-ui",
    target: "_blank",
  },
  {
    label: "Releases",
    to: "https://github.com/nuxt/ui/releases",
    target: "_blank",
  },
]; */
</script>

<template>
  <div
    class="bottom-0 backdrop-blur-md bg-default/90 border-t border-dashed border-gray-300 dark:border-gray-700"
  >
    <UFooter
      class="container border-x border-dashed border-gray-300 dark:border-gray-700 max-w-6xl justify-between items-center mx-auto"
    >
      <template #left>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }} | Alaa Elsamouly
        </p>
      </template>

      <!-- <UNavigationMenu :items="items" variant="link" /> -->

      <template #right>
        <UButton
          icon="i-simple-icons-discord"
          variant="ghost"
          to="https://discord.gg/ENhtxaH7"
          target="_blank"
          aria-label="Discord"
        />
        <UButton
          icon="i-simple-icons-x"
          variant="ghost"
          to="https://x.com/sam0uly"
          target="_blank"
          aria-label="X"
        />
        <UButton
          icon="i-simple-icons-github"
          variant="ghost"
          to="https://github.com/N1xev"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </UFooter>
  </div>
</template>
