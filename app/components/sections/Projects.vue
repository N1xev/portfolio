<template>
  <section id="projects" class="flex flex-col w-full overflow-hidden ">
    <div
      class="w-full border-b border-dashed border-gray-300 dark:border-gray-700 py-20 md:py-20 px-4 relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03]" />
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="mb-6 flex justify-center">
          <span
            class="font-mono text-xs uppercase tracking-[0.3em] py-1 px-3 border border-dashed border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
            Explore My Work
          </span>
        </div>
        <h2 class="text-5xl md:text-7xl font-bold font-accent mb-8 tracking-tight">
          Selected
          <span
            class="underline decoration-dashed decoration-gray-400 dark:decoration-gray-600 underline-offset-8">Projects</span>
        </h2>
        <UiTextScramble
          :class-name="'text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed'"
          :radius="35" :duration="1.2" :speed="0.5" scramble-chars=".:">
          A collection of technical solutions, open-source tools, and full-stack
          applications designed for performance and scalability.
        </UiTextScramble>
      </div>
    </div>

    <div class="flex flex-col w-full overflow-hidden p-px m-px min-h-[300px]">
      <UCarousel :gap="0" :items="projects" :ui="{
        item: 'md:basis-1/3 basis-1/1',
        container: 'h-full'
      }" class="overflow-hidden h-full" wheel-gestures>
        <template #default="{ item: project }">
          <div class="border-r border-dashed border-gray-300 dark:border-gray-700 h-[450px] px-0">
            <UCard :ui="{ body: '!pl-2' }"
              class="h-full flex flex-col ring-0 rounded-none shadow-none border-0 group hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-300">
              <div
                class="aspect-video w-full relative overflow-hidden border-b border-dashed border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 pointer-events-none shrink-0">
                <div
                  class="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <NuxtImg v-if="project.image" :src="project.image" class="w-full h-full object-cover" />
                  <UIcon v-else class="text-gray-700 dark:text-gray-700 size-20" name="i-heroicons-photo" />
                </div>

                <div
                  class="absolute inset-0 bg-gray-300/70 dark:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <UButton v-if="project.links.github" :to="project.links.github"
                    class="rounded-none pointer-events-auto" color="neutral" label="View Code" size="md" target="_blank"
                    variant="subtle" />
                </div>

                <div class="absolute top-0 left-0 p-3">
                  <span
                    class="bg-white/90 dark:bg-gray-900/90 border border-dashed border-gray-300 dark:border-gray-700 px-2 py-1 text-[10px] font-mono uppercase tracking-wider">
                    {{ project.tech[0] }}
                  </span>
                </div>
              </div>

              <div class="p-6 flex-1 flex flex-col min-h-0">
                <div class="group">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold font-accent truncate pr-2">
                      {{ project.title }}
                    </h3>

                    <UTooltip v-if="project.links.demo" text="Live Preview">
                      <UButton :to="project.links.demo" aria-label="Live Preview"
                        class="p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" size="xs"
                        target="_blank" variant="link">
                        <UIcon class="w-5 h-5 text-gray-400 hover:text-primary-500 transition-colors"
                          name="i-heroicons-arrow-up-right" />
                      </UButton>
                    </UTooltip>
                  </div>
                </div>

                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 shrink-0">
                  {{ project.description }}
                </p>

                <div class="mt-auto flex flex-wrap gap-2">
                  <span v-for="tech in project.tech" :key="tech"
                    class="text-[13px] uppercase font-mono px-2 py-1 border border-dashed border-gray-300 dark:border-gray-700 text-gray-500">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </UCard>
          </div>
        </template>
      </UCarousel>
    </div>
  </section>
</template>