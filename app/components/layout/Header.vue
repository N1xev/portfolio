<script lang="ts" setup>
import type {NavigationMenuItem} from "@nuxt/ui"

const route = useRoute()

const activeSectionId = ref("home")

const isHomePage = computed(() => route.path === "/")

const items = computed<NavigationMenuItem[]>(() => [
  {label: "Home", to: "/#home", active: isHomePage.value && activeSectionId.value === "home"},
  {label: "About", to: "/#about", active: isHomePage.value && activeSectionId.value === "about"},
  {label: "Activity", to: "/#github", active: isHomePage.value && activeSectionId.value === "github"},
  {label: "Projects", to: "/#projects", active: isHomePage.value && activeSectionId.value === "projects"},
  {label: "Contact", to: "/#contact", active: isHomePage.value && activeSectionId.value === "contact"},
  {
    label: "Blog",
    to: "/blog",
    icon: "i-lucide-newspaper",
    active: route.path.startsWith("/blog"),
    variant: "subtle",
    color: "error" as const,
  },
])

let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (import.meta.server) return

  observer?.disconnect()

  if (!isHomePage.value) {
    activeSectionId.value = ""
    return
  }

  nextTick(() => {
    const sections = document.querySelectorAll("section[id]")

    observer = new IntersectionObserver(
        (entries) => {
          let best: Element | null = null
          let bestRatio = 0

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
              bestRatio = entry.intersectionRatio
              best = entry.target
            }
          })

          if (best) {
            activeSectionId.value = best.getAttribute("id") || ""
          }
        },
        {
          rootMargin: "-100px 0px -70% 0px",
          threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        }
    )

    sections.forEach((s) => observer!.observe(s))
  })
}

onMounted(() => {
  if (isHomePage.value) {
    activeSectionId.value = route.hash ? route.hash.slice(1) : "home"
  }

  setupObserver()

  watch(
      () => route.path,
      () => {
        setupObserver()
      }
  )
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div
      class="sticky top-0 z-50 bottom-0 border-b border-dashed border-gray-300 dark:border-gray-700"
  >
    <UHeader
        class="container border-x border-b-0 backdrop-blur-lg bg-default/90 border-dashed border-gray-300 dark:border-gray-700 max-w-6xl justify-between items-center mx-auto"
        mode="drawer"
    >
      <template #title> Alaa Elsamouly</template>

      <UNavigationMenu :items="items"/>

      <template #right>
        <UiColorModeButton/>

        <UTooltip :kbds="['meta', 'G']" text="Open on GitHub">
          <UButton
              aria-label="GitHub"
              color="neutral"
              icon="i-simple-icons-github"
              target="_blank"
              to="https://github.com/N1xev/portfolio"
              variant="ghost"
          />
        </UTooltip>
      </template>

      <template #body>
        <UNavigationMenu
            :items="items"
            class="-mx-2.5 rounded-none"
            orientation="vertical"
        />
      </template>
    </UHeader>
  </div>
</template>
