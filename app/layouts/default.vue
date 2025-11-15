<template>
  <div
    class="relative h-[calc(100vh-(var(--ui-header-height) + var(ui-footer-height)))]">
    <div class="fixed inset-0 pointer-events-none">
      <div class="max-w-5xl mx-auto h-full relative">
        <div
          class="absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-gray-300 dark:border-gray-700"
        />

        <div
          class="absolute right-0 top-0 bottom-0 w-px border-r border-dashed border-gray-300 dark:border-gray-700"
        />
      </div>
    </div>

    <div class="max-w-5xl mx-auto">
      <slot />
    </div>
  </div>
</template>
