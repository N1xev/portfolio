<script setup lang="ts">
const error = useError()

const errorCode = computed(() => error.value?.statusCode || 500)
const errorTitle = computed(() => {
  switch (errorCode.value) {
    case 404:
      return 'Page Not Found'
    case 500:
      return 'Internal Server Error'
    case 403:
      return 'Forbidden'
    case 401:
      return 'Unauthorized'
    default:
      return 'Something Went Wrong'
  }
})

const errorMessage = computed(() => {
  switch (errorCode.value) {
    case 404:
      return "The page you're looking for doesn't exist or has been moved."
    case 500:
      return 'An unexpected error occurred on our servers. Please try again later.'
    case 403:
      return "You don't have permission to access this resource."
    case 401:
      return 'Please log in to access this page.'
    default:
      return error.value?.message || 'An unexpected error occurred.'
  }
})

const suggestions = computed(() => {
  switch (errorCode.value) {
    case 404:
      return [
        { icon: 'i-heroicons-home', text: 'Go back home', action: '/' },
        { icon: 'i-heroicons-arrow-left', text: 'Go back', action: 'back' }
      ]
    case 500:
      return [
        { icon: 'i-heroicons-arrow-path', text: 'Refresh page', action: 'refresh' },
        { icon: 'i-heroicons-home', text: 'Go home', action: '/' },
        { icon: 'i-heroicons-envelope', text: 'Contact support', action: '/#contact' }
      ]
    default:
      return [
        { icon: 'i-heroicons-home', text: 'Go home', action: '/' },
        { icon: 'i-heroicons-arrow-left', text: 'Go back', action: 'back' }
      ]
  }
})

const handleAction = (action: string) => {
  if (action === 'back') {
    window.history.back()
  } else if (action === 'refresh') {
    window.location.reload()
  } else {
    clearError({ redirect: action })
  }
}

const handleClearError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen flex flex-col">
      <section class="flex flex-col flex-1 items-center justify-center">
        <div class="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[calc(100vh-64px)]">
          <UCard
            class="ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-t border-b lg:border-b-0 lg:border-r flex items-center justify-center"
          >
            <div class="text-center lg:text-left px-8">
              <div class="mb-6">
                <span
                  class="inline-block text-8xl font-bold font-mono border-4 border-dashed border-gray-300 dark:border-gray-700 px-8 py-4 rounded-none"
                >
                  {{ errorCode }}
                </span>
              </div>

              <!-- Error Title -->
              <h1 class="text-4xl font-bold mb-4 underline decoration-dashed font-accent">
                {{ errorTitle }}
              </h1>

              <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {{ errorMessage }}
              </p>

              <div
                v-if="error?.statusMessage"
                class="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-none bg-gray-50 dark:bg-gray-900"
              >
                <p class="text-xs font-mono text-gray-500 dark:text-gray-400 break-all">
                  {{ error.statusMessage }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard
            class="ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-t flex items-center justify-center"
          >
            <div class="w-full px-8">
              <h2 class="text-2xl font-semibold mb-6">What can you do?</h2>

              <div class="space-y-4 mb-8">
                <button
                  v-for="(suggestion, index) in suggestions"
                  :key="index"
                  class="flex items-center gap-4 p-4 w-full rounded-none border border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
                  @click="handleAction(suggestion.action)"
                >
                  <UIcon :name="suggestion.icon" class="text-2xl shrink-0" />
                  <div class="flex-1 text-left">
                    <p class="text-base font-medium">{{ suggestion.text }}</p>
                  </div>
                  <UIcon
                    name="i-heroicons-arrow-right"
                    class="text-gray-400 shrink-0"
                  />
                </button>
              </div>

              <div
                class="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-none"
              >
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Still having trouble? Feel free to reach out:
                </p>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                    <UIcon name="i-heroicons-envelope" class="text-base" />
                    <a
                      href="mailto:alasamouly@gmail.com"
                      class="hover:underline"
                    >
                      alasamouly@gmail.com
                    </a>
                  </div>
                  <div class="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                    <UIcon name="i-simple-icons-github" class="text-base" />
                   <a 
                      href="https://github.com/N1xev"
                      target="_blank"
                      class="hover:underline"
                    >
                      @N1xev
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="w-full border-t border-dashed border-gray-300 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row">
            <button
              class="flex-1 px-6 py-4 text-base font-medium border-r-0 sm:border-r border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
              @click="handleClearError"
            >
              <UIcon name="i-heroicons-home" class="inline mr-2" />
              Return Home
            </button>
            <button
              class="flex-1 px-6 py-4 text-base font-medium border-r-0 sm:border-r border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
              @click="handleAction('back')"
            >
              <UIcon name="i-heroicons-arrow-left" class="inline mr-2" />
              Go Back
            </button>
            <button
              class="flex-1 px-6 py-4 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
              @click="handleAction('refresh')"
            >
              <UIcon name="i-heroicons-arrow-path" class="inline mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
