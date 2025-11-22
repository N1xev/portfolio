<script setup lang="ts">
interface ContributionDay {
  date: string
  count: number
}

interface GithubStatsResponse {
  stats: {
    repos: number
    stars: number
    contributions: number
    languages: string[]
    organizations: string[]
  }
  contributions: ContributionDay[]
  cachedAt: string
}

interface GridDay {
  date: string | null
  count: number
}

const {data: githubData, error} = await useFetch<GithubStatsResponse>('/api/github-stats', {lazy: false})

const stats = computed(() => githubData.value?.stats || {
  repos: 0,
  stars: 0,
  contributions: 0,
  languages: [],
  organizations: []
})

const contributionData = computed(() => githubData.value?.contributions || [])

const getContributionColor = (count: number): string => {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
  if (count < 3) return 'bg-teal-200 dark:bg-teal-900'
  if (count < 6) return 'bg-teal-400 dark:bg-teal-700'
  if (count < 9) return 'bg-teal-600 dark:bg-teal-500'
  return 'bg-teal-800 dark:bg-teal-400'
}

const getWeeklyData = (): GridDay[][] => {
  const data = contributionData.value
  if (!data.length) return []

  const weeks: GridDay[][] = []
  let currentWeek: GridDay[] = []

  const firstEntry = data[0]
  if (!firstEntry) return []

  const firstDate = new Date(firstEntry.date)
  const firstDayOfWeek = firstDate.getDay()

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({date: null, count: 0})
  }

  data.forEach((day) => {
    currentWeek.push({date: day.date, count: day.count})
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({date: null, count: 0})
    }
    weeks.push(currentWeek)
  }

  return weeks
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getMonthLabels = () => {
  const weeks = getWeeklyData()
  const labels: { label: string; offset: number }[] = []
  let lastMonth = -1

  const CELL_TOTAL = 16

  weeks.forEach((week, weekIndex) => {
    const dayWithDate = week.find((d): d is { date: string; count: number } => d.date !== null)

    if (!dayWithDate) return

    const month = new Date(dayWithDate.date).getMonth()
    if (month === lastMonth) return

    const dayIndex = week.findIndex(d => d.date !== null)

    const offset = weekIndex * CELL_TOTAL + dayIndex * CELL_TOTAL + 8

    labels.push({
      label: monthNames[month] ?? '',
      offset
    })

    lastMonth = month
  })

  return labels
}

const getLanguageColor = (lang: string): string => {
  const colors: Record<string, string> = {
    'Go': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'JavaScript': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    'TypeScript': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'Python': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'Vue': 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
  }
  return colors[lang] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
}
</script>

<template>
  <section id="github" class="flex flex-col my-px h-full items-center justify-center">

    <div class="grid grid-cols-1 w-full">
      <UCard
          class="text-center pt-12 pb-6 ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-t-0">
        <h1 class="text-4xl md:text-5xl underline decoration-dashed decoration-gray-400 dark:decoration-gray-600 font-bold mb-4">
          GitHub Activity</h1>

        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          Error loading GitHub data
          <p class="text-sm mt-2">{{ error }}</p>
        </div>

        <div v-else class="space-y-4 block items-center">
          <UiTextScramble
              :class-name="'text-lg px-4 md:px-16 lg:px-24 text-gray-600 dark:text-gray-400'"
              :radius="35"
              :duration="1.2"
              :speed="0.5"
              scramble-chars=".:"
          >
            A visual diary of turning coffee into code. Each square represents moments of focus, frustration, and those
            rare 'it just works' victories. Still learning, still shipping, still here.
          </UiTextScramble>

          <div
              class="md:flex md:flex-col items-center mt-6 pt-6 border-t border-dashed border-gray-300 dark:border-gray-700">

            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">
                {{ stats.contributions }} contributions in the last year
              </h3>
            </div>

            <div class="overflow-x-auto">
              <div class="flex">
                <div class="w-8 flex-shrink-0"/>

                <div class="relative flex-1">
                  <div
                      v-for="month in getMonthLabels()"
                      :key="month.label"
                      class="absolute text-xs text-gray-500 dark:text-gray-400 font-medium -translate-x-1/2 top-0"
                      :style="{ left: `${month.offset}px` }"
                  >
                    {{ month.label }}
                  </div>
                </div>
              </div>

              <div class="flex gap-1 py-4 mt-2">
                <div class="flex flex-col  text-xs text-gray-500 dark:text-gray-400 justify-around pr-1 -mt-[2px]">
                  <span class="invisible">Sun</span>
                  <span>Mon</span>
                  <span class="invisible">Tue</span>
                  <span>Wed</span>
                  <span class="invisible">Thu</span>
                  <span>Fri</span>
                  <span class="invisible">Sat</span>
                </div>

                <div class="flex gap-1">
                  <div v-for="(week, weekIndex) in getWeeklyData()" :key="weekIndex" class="flex flex-col gap-1">
                    <UTooltip
                        v-for="(day, dayIndex) in week"
                        :key="dayIndex"
                        :text="day.date ? `${day.date}: ${day.count} contributions` : ''"
                        :popper="{ placement: 'top' }"
                    >
                      <div
                          :class="day.date ? getContributionColor(day.count) : 'bg-transparent'"
                          class="w-3 h-3 "
                      />
                    </UTooltip>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
              <span>Less</span>
              <div class="w-3 h-3 bg-gray-100 dark:bg-gray-800"/>
              <div class="w-3 h-3 bg-teal-200 dark:bg-teal-900"/>
              <div class="w-3 h-3 bg-teal-400 dark:bg-teal-700"/>
              <div class="w-3 h-3 bg-teal-600 dark:bg-teal-500"/>
              <div class="w-3 h-3 bg-teal-800 dark:bg-teal-400"/>
              <span>More</span>
            </div>
          </div>
        </div>
      </UCard>
    </div>
    <!-- Second row: 4 columns -->
    <div class="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-4">
      <UCard
          class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-folder" class="text-xl"/>
          <h3 class="text-xl font-semibold">Repositories</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Public projects showcasing various technologies
        </p>
        <p class="text-2xl font-bold mt-4">{{ stats.repos }}</p>
      </UCard>

      <UCard
          class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r-0 sm:border-r md:border-r cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-code-bracket-square" class="text-xl"/>
          <h3 class="text-xl font-semibold">Languages</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Primary languages across repositories
        </p>
        <div class="flex gap-2 mt-4 flex-wrap">
          <span
              v-for="lang in stats.languages"
              :key="lang"
              :class="getLanguageColor(lang)"
              class="px-2 py-1 text-xs rounded">
            {{ lang }}
          </span>
        </div>
      </UCard>

      <UCard
          class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-fire" class="text-xl"/>
          <h3 class="text-xl font-semibold">Contributions</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Year-round consistent commits and contributions
        </p>
        <p class="text-2xl font-bold mt-4">{{ stats.contributions }}</p>
      </UCard>

      <UCard
          class="rounded-none ring-0 border-dashed border-gray-300 dark:border-gray-700 border-t border-l-0 border-r-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
        <div class="flex items-center gap-3 mb-3">
          <UIcon name="i-heroicons-star" class="text-xl"/>
          <h3 class="text-xl font-semibold">Stars Earned</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Recognition from the developer community
        </p>
        <p class="text-2xl font-bold mt-4">{{ stats.stars }}</p>
      </UCard>
    </div>

  </section>
</template>
