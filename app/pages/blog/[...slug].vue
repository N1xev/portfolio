<script setup>
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});
const formattedDate = computed(() => {
  if (!post.value?.meta?.date) return "No date";
  return new Date(post.value.meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const displayTags = computed(() => {
  if (!post.value?.meta?.tags) return "";
  return Array.isArray(post.value.meta.tags)
    ? post.value.meta.tags.join(", ")
    : post.value.meta.tags;
});

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first(),
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
</script>

<template>
  <div>
    <div class="container justify-between items-center mx-auto px-6 py-8">
      <!-- Back button -->
      <div class="mb-6 flex items-center justify-between">
        <UButton class="text-sm font-accent" variant="ghost" to="/blog">
          Back to Blog
        </UButton>
        <UButton variant="ghost" icon="i-heroicons-tag" class="text-sm font-mono">
          {{ displayTags }}
        </UButton>
      </div>

      <!-- Table of contentooo -->
      <UContentToc
        class="border-dashed border-y md:hidden border-gray-300 dark:border-gray-700 md:border-x mb-4"
        title="On this blog post!"
        highlight
        highlight-color="gray"
        color="gray"
        :defaultOpen="false"
        :links="page.body.toc.links"
      />

      <!-- Post Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold font-accent">{{ post.title }}</h1>
          <div class="flex items-center gap-2">
            <UButton
              variant="ghost"
              icon="i-heroicons-calendar"
              class="text-sm font-accent"
            >
              {{ formattedDate }}
            </UButton>
          </div>
        </div>
      </div>
      
      <!-- Post Image -->
      <div v-if="post.meta.image" class="mb-6">
        <NuxtImg
          :src="post.meta.image"
          alt="Post Image"
          class="w-full max-h-130 object-cover rounded-lg"
        />
      </div>

      <!-- Post Content -->
      <div
        class="prose prose-sm prose-headings:text-xl prose-a:text-primary-500 font-body"
      >
        <ContentRenderer
          v-if="post"
          :value="post"
          color="gray"
          class="prose prose-sm prose-headings:text-xl prose-a:text-primary-500 font-body"
        />
      </div>
    </div>
    <UiPrevNextPost />
  </div>
</template>
