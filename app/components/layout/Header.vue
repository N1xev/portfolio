<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const activeSection = ref('#home');

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "#home",
    active: activeSection.value === "#home",
  },
  {
    label: "About",
    to: "#about",
    active: activeSection.value === "#about",
  },
/*  {
    label: "Projects",
    to: "#projects",
    active: activeSection.value === "#projects",
  },
  {
    label: "Contact",
    to: "#contact",
    active: activeSection.value === "#contact",
  }, */
  {
    label: "Blog",
    to: "/blog",
    icon: "i-lucide-newspaper",
    active: route.path.startsWith("/blog"),
    variant: "subtle",
    color: "error",
  },
]);

onMounted(() => {
  // Initialize from URL hash if exists
  if (route.hash) {
    activeSection.value = route.hash;
  }

  // Intersection Observer to detect which section is in view
  const sections = ['#home', '#about', '#projects', '#contact'];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          activeSection.value = id;
          // Optional: update URL hash without scrolling
          window.history.replaceState(null, '', id);
        }
      });
    },
    {
      threshold: 0.5, // Section needs to be 50% visible
      rootMargin: '-100px 0px -100px 0px' // Adjust based on your header height
    }
  );

  // Observe all sections
  sections.forEach((sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      observer.observe(element);
    }
  });

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});
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
