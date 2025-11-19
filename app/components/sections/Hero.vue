<template>
  <section
    id="home"
    class="flex flex-col h-[calc(100vh-(var(--ui-header-height)+42px))] items-center justify-center"
  >
    <div
      class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-42 sm:py-42 lg:py-60 gap-16 sm:gap-y-24"
    >
      <div class="text-center">
        <UiSplitText
            text="Consider this your invitation."
          class-name="text-5xl sm:text-7xl font-semibold text-center"
          :delay="100"
          :duration="1.2"
          ease="bounce.out"
          split-type="words"
          :from="{ opacity: 0, y: 50 }"
          :to="{ opacity: 1, y: 0 }"
          :threshold="0.1"
          root-margin="-100px"
          text-align="center"
        />
        <div class="text-lg sm:text-xl/8 text-muted text-balance mt-6"/>
        <UiTextScramble
            :class-name="'text-balance text-lg sm:text-xl/8 text-muted  mt-6'"
            :radius="35"
            :duration="1.2"
            :speed="0.5"
            scramble-chars=".:"
        >
          Software engineer from Egypt. Building scalable applications that solve real problems with clean, maintainable code and great user
            experiences.
        </UiTextScramble>
        <div class="mt-10">
          <div class="flex flex-wrap gap-x-6 gap-y-3 justify-center">
            <UButton
              color="neutral"
              variant="ghost"
              size="xl"
              to="https://github.com/N1xev"
              icon="i-lucide-github"
              target="_blank"
            >
              WareHouse
            </UButton>
            <UButton
              color="neutral"
              variant="subtle"
              size="xl"
              to="/blog"
              icon="i-simple-icons:ollama"
            >
              My Blog
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

