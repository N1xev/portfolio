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
</script>

<template>
  <div class="container justify-between items-center mx-auto px-6 py-8">
    <!-- Back button -->
    <div class="mb-6 flex items-center justify-between">
      <UButton class="text-sm" variant="ghost" to="/blog">
        Back to Blog
      </UButton>
      <UButton variant="ghost" icon="i-heroicons-tag" class="text-sm">
        {{ displayTags }}
      </UButton>
    </div>

    <!-- Post Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{ post.title }}</h1>
        <div class="flex items-center gap-2">
          <UButton variant="ghost" icon="i-heroicons-calendar" class="text-sm">
            {{ formattedDate }}
          </UButton>
        </div>
      </div>
    </div>
    <!-- Post Image -->
    <div v-if="post.meta.image" class="mb-6">
      <div
        class="flex items-center overflow-hidden rounded-lg h-130 justify-center"
      >
        <img
          :src="post.meta.image"
          alt="Post Image"
          class="w-full fit rounded-lg"
        />
      </div>
    </div>

    <div class="prose prose-sm prose-headings:text-xl prose-a:text-primary-500">
      <ContentRenderer
        v-if="post"
        :value="post"
        color="gray"
        class="prose prose-sm prose-headings:text-xl prose-a:text-primary-500"
      />
    </div>
  </div>
</template>
