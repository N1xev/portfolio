<template>
  <div class="dev-separator border-dashed border-y border-gray-300 dark:border-gray-700 w-full">
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      class="w-full h-10 md:h-10"
      aria-hidden="true"
    >
      <line
        v-for="n in 100"
        :key="n"
        :x1="(n - 1) * 25 - 200"
        :y1="0"
        :x2="(n - 1) * 25 - 200 + 20"
        :y2="80"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        class="text-gray-300 dark:text-gray-700 hidden sm:block"
      />

      <line
        v-for="n in 30"
        :key="'mobile-' + n"
        :x1="(n - 1) * 68"
        :y1="0"
        :x2="(n - 1) * 68 + 80"
        :y2="80"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        class="text-gray-300 dark:text-gray-700 sm:hidden"
      />
    </svg>
  </div>
</template>
