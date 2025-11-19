<template>
  <section id="about" class="flex flex-col h-full items-center justify-center">
    <!-- First row for the Main card -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] ">
      <UCard class="ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-b md:border-b-0 border-t-0 pt-16">
        <h1 class="text-4xl font-bold mb-8 underline decoration-dashed decoration-gray-400 dark:decoration-gray-600 font-accent">Get to know me:</h1>
        <UiTextScramble
            :class-name="'text-lg text-gray-600 dark:text-gray-400'"
            :radius="35"
            :duration="1.2"
            :speed="0.5"
            scramble-chars=".:"
        >
          I'm <ProseCode>Alaa</ProseCode> Elsamouly, software engineer from <ProseCode>Egypt</ProseCode>, passionate about building real, production-ready applications. I specialize in Go/NodeJS for backend and Bun, Next.js, Nuxt.js for frontend, and I focus on writing clean, <ProseCode>scalable</ProseCode> and <ProseCode>maintainable</ProseCode> code.
          I enjoy building projects that solve real problems—ranging from Discord bots and CLI/TUI tools to full web platforms—and I'm always looking for new challenges to grow my skills.
          My goal is to deliver reliable, efficient solutions and to tackle complex problems with <ProseCode>confidence</ProseCode>.
        </UiTextScramble>
      </UCard>
      <NuxtImg
          src="/me1.jpg"
          alt="Alaa Elsamouly"
          class="w-full border-dashed border-gray-300 dark:border-gray-700 border-l"
          />
    </div>
    <!-- Second row for the 4 cards -->
    <div class="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-4">
      <UCard class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-code-bracket" class="text-xl" />
          <h1 class="text-lg font-semibold">Backend Developer</h1>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Building robust APIs and services with Go, focusing on performance and scalability
        </p>
      </UCard>

      <UCard class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r-0 sm:border-r md:border-r cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-window" class="text-xl" />
          <h3 class="text-lg font-semibold">Frontend Developer</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Creating modern web interfaces with Bun, Next.js, Nuxt.js and Vue for seamless user experiences
        </p>
      </UCard>

      <UCard class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-command-line" class="text-xl" />
          <h3 class="text-lg font-semibold">CLI/TUI Tools</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Developing command-line and terminal interfaces for efficient developer workflows
        </p>
      </UCard>
      <UCard class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-cog-6-tooth" class="text-xl" />
          <h3 class="text-lg font-semibold">DevOps</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
       Automating deployments and infrastructure with CI/CD pipelines, Docker, and cloud platforms
        </p>
      </UCard>
    </div>
  </section>
</template>