<script lang="ts" setup>
import {getLocalTimeZone, today} from "@internationalized/date";

const selectedTab = ref("contact");

const tabs = [
  {key: "contact", label: "Contact Info", icon: "i-heroicons-identification"},
  {key: "calendar", label: "Schedule a Call", icon: "i-heroicons-calendar-days"},
];

const contactMethods = [
  {
    icon: "i-heroicons-envelope",
    label: "Email",
    value: "alasamouly@gmail.com",
    action: "mailto:alasamouly@gmail.com",
    primary: true,
  },
  {
    icon: "i-simple-icons-github",
    label: "GitHub",
    value: "@N1xev",
    action: "https://github.com/N1xev",
  },
  {
    icon: "i-simple-icons-linkedin",
    label: "LinkedIn",
    value: "Alaa Elsamouly",
    action: "https://linkedin.com/in/elsamouly",
    primary: true,
  },
  {
    icon: "i-simple-icons-x",
    label: "X",
    value: "@sam0uly",
    action: "https://x.com/sam0uly",
  },
];

const selectedDate = ref(today(getLocalTimeZone()));
const selectedTime = ref("");
const userName = ref("");
const userEmail = ref("");
const sessionDuration = ref(30);

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const durationOptions = [
  {value: 15, label: "15 min"},
  {value: 30, label: "30 min"},
  {value: 45, label: "45 min"},
  {value: 60, label: "60 min"},
];

const calUsername = "alaa-elsamouly";
const calEventSlug = "30min";

const isWeekend = (date: CalendarDate) => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const day = jsDate.getDay();
  return day === 5 || day === 6;
};

const isDateDisabled = (date: CalendarDate) => {
  const todayDate = today(getLocalTimeZone());
  if (date.compare(todayDate) < 0) return true;
  return isWeekend(date);
};

const generateBookingUrl = () => {
  if (!selectedDate.value || !selectedTime.value) {
    return null;
  }

  const dateStr = `${selectedDate.value.year}-${String(selectedDate.value.month).padStart(2, "0")}-${String(selectedDate.value.day).padStart(2, "0")}`;

  const [hours, minutes] = selectedTime.value.split(":");
  const slotDateTime = new Date(
      selectedDate.value.year,
      selectedDate.value.month - 1,
      selectedDate.value.day,
  );
  slotDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  const params = new URLSearchParams({
    date: dateStr,
    slot: slotDateTime.toISOString(),
    overlayCalendar: "true",
  });

  if (userName.value) params.append("name", userName.value);
  if (userEmail.value) params.append("email", userEmail.value);

  return `https://cal.com/${calUsername}/${calEventSlug}?${params.toString()}`;
};

const bookTimeSlot = () => {
  const url = generateBookingUrl();
  if (url) {
    navigateTo(url, {external: true, open: {target: "_blank"}});
  }
};

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return "";
  const jsDate = new Date(
      selectedDate.value.year,
      selectedDate.value.month - 1,
      selectedDate.value.day,
  );
  return jsDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <section
      id="contact"
      class="flex flex-col my-px h-full items-center justify-center"
  >
    <!-- Tabs Header -->
    <div class="w-full">
      <div class="flex">
        <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="[
                'flex-1 px-6 py-4 flex items-center justify-center gap-3 transition-all duration-300 border-r border-dashed border-gray-300 dark:border-gray-700 last:border-r-0',
                selectedTab === tab.key? 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ring-gray-900/5 dark:ring-white/10'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            ]"
            @click="selectedTab = tab.key"
        >
          <UIcon :class="[selectedTab === tab.key ? 'text-xl' : 'text-lg opacity-70']" :name="tab.icon"/>
          <span :class="selectedTab === tab.key ? 'font-bold' : 'font-normal'">{{ tab.label }}</span>

          <UIcon
              v-if="selectedTab !== tab.key"
              class="text-xs opacity-50 ml-2"
              name="i-heroicons-arrow-right"
          />
        </button>
      </div>
    </div>

    <!-- Contact Info Tab -->
    <div
        v-show="selectedTab === 'contact'"
        class="grid grid-cols-1 md:grid-cols-2 w-full"
    >
      <!-- Left: Message -->
      <UCard
          class="ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-t border-b md:border-b-0 md:border-r sm:py-46 py-12 flex items-center"
      >
        <div>
          <h1
              class="text-4xl font-bold mb-6 underline decoration-dashed decoration-gray-400 dark:decoration-gray-600 font-accent"
          >
            Let's work together
          </h1>
          <UiTextScramble
              :class-name="'text-lg text-gray-600 dark:text-gray-400 mb-6'"
              :duration="1.2"
              :radius="35"
              :speed="0.5"
              scramble-chars=".:"
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </UiTextScramble>
          <p class="text-base text-gray-500 dark:text-gray-500">
            Currently available for freelance work and open source
            collaborations.
          </p>
        </div>
      </UCard>

      <!-- Right: Contact Methods -->
      <UCard
          class="ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-t pt-16"
      >
        <h2 class="text-2xl font-semibold mb-6">Reach out via:</h2>
        <div class="space-y-4">
          <a
              v-for="method in contactMethods"
              :key="method.label"
              :class="[
              'flex items-center gap-4 p-4 rounded-none border border-dashed transition-all duration-300',
              method.primary
                ? 'border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900',
            ]"
              :href="method.action"
              target="_blank"
          >
            <UIcon :name="method.icon" class="text-2xl shrink-0"/>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ method.label }}
              </p>
              <p class="text-base font-mono truncate">{{ method.value }}</p>
            </div>
            <UIcon
                class="text-gray-400 shrink-0"
                name="i-heroicons-arrow-up-right"
            />
          </a>
        </div>
      </UCard>
    </div>

    <!-- Calendar Tab -->
    <div
        v-show="selectedTab === 'calendar'"
        class="grid grid-cols-1 md:grid-cols-2 w-full"
    >
      <!-- Left: Form & Actions -->
      <UCard
          class="ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-t border-b md:border-b-0 md:border-r pt-16"
      >
        <div>
          <h1
              class="text-4xl font-bold mb-6 underline decoration-dashed decoration-gray-400 dark:decoration-gray-600 font-accent"
          >
            Book a meeting
          </h1>

          <UiTextScramble
              :class-name="'text-lg text-gray-600 dark:text-gray-400 mb-8'"
              :duration="1.2"
              :radius="35"
              :speed="0.5"
              scramble-chars=".:"
          >
            Select a date and time that works best for you. You'll be redirected
            to complete your booking.
          </UiTextScramble>

          <!-- User Info Form -->
          <div class="space-y-4 mb-8">
            <div>
              <UInput
                  v-model="userName"
                  :ui="{
                  base: 'rounded-none',
                }"
                  class="border-dashed"
                  placeholder="John Doe"
              />
            </div>

            <div>
              <UInput
                  v-model="userEmail"
                  :ui="{
                  base: 'rounded-none',
                }"
                  class="border-dashed"
                  placeholder="john@example.com"
                  type="email"
              />
            </div>
          </div>

          <!-- Duration Selection -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Session Duration:</h3>
            <div class="grid grid-cols-4 gap-2">
              <button
                  v-for="duration in durationOptions"
                  :key="duration.value"
                  :class="[
                  'px-3 py-2 text-sm border border-dashed rounded-none transition-all duration-300',
                  sessionDuration === duration.value
                    ? 'bg-gray-200 dark:bg-gray-800 dark:text-gray-200 text-gray-900 border-gray-300 dark:border-gray-700'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900',
                ]"
                  @click="sessionDuration = duration.value"
              >
                {{ duration.label }}
              </button>
            </div>
          </div>

          <!-- Selected Info -->
          <div
              v-if="selectedDate && selectedTime && !isWeekend(selectedDate)"
              class="mb-6 p-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-none text-sm"
          >
            <p class="text-gray-600 dark:text-gray-400">
              Selected:
              <span class="font-mono"
              >{{ formatSelectedDate }} at {{ selectedTime }}</span
              >
            </p>
          </div>
          <!-- Weekend Warning -->
          <div
              v-if="isWeekend(selectedDate)"
              class="mb-6 p-4 border border-dashed border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded-none text-sm text-yellow-700 dark:text-yellow-400"
          >
            <UIcon
                class="inline mr-2"
                name="i-heroicons-exclamation-triangle"
            />
            I'm not available on Fridays and Saturdays. Please select another
            day.
          </div>

          <!-- Book Button -->
          <UButton
              :disabled="
              !selectedTime ||
              !userName ||
              !userEmail ||
              isWeekend(selectedDate)
            "
              block
              class="rounded-none"
              color="neutral"
              size="lg"
              variant="subtle"
              @click="bookTimeSlot"
          >
            <UIcon class="mr-2" name="i-heroicons-arrow-right"/>
            Continue to Booking
          </UButton>

          <!-- Availability Info -->
          <div class="mt-6 space-y-2 text-sm text-gray-500 dark:text-gray-500">
            <div class="flex items-center gap-2">
              <UIcon class="text-base" name="i-heroicons-video-camera"/>
              <span>Google Meet or your preferred platform</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon class="text-base" name="i-heroicons-calendar"/>
              <span>Sunday - Thursday, 9:00 AM - 10:00 PM (GMT+2)</span>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Right: Calendar & Time Slots -->
      <UCard
          class="ring-0 rounded-none border-dashed border-x-0 border-gray-300 dark:border-gray-700 border-t pt-8 pb-8"
      >
        <!-- Calendar -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Select a Date:</h3>
          <UCalendar
              v-model="selectedDate"
              :is-date-disabled="isDateDisabled"
          />
        </div>

        <!-- Time Slots -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Select a Time:</h3>
          <div
              class="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[400px] overflow-y-auto "
          >
            <button
                v-for="time in timeSlots"
                :key="time"
                :class="[
                'py-2 text-sm text-center border border-dashed rounded-none transition-all duration-300',
                selectedTime === time
                  ? 'bg-gray-200 dark:bg-gray-800 dark:text-gray-200 text-gray-900 border-gray-300 dark:border-gray-700'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900',
                isWeekend(selectedDate) && 'opacity-50 cursor-not-allowed',
              ]"
                :disabled="isWeekend(selectedDate)"
                @click="selectedTime = time"
            >
              {{ time }}
            </button>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>
