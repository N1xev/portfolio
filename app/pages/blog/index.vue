<script setup lang="ts">
const { data: posts } = await useAsyncData("blog", () =>
  queryCollection("blog").all(),
);

const formatDate = (date: string) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTags = (tags: string | string[]) => {
  if (!tags) return [];
  return Array.isArray(tags) ? tags : [tags];
};

const authors = ref([
  {
    name: "Alaa ElSamouly",
    avatar: {
      src: "/samouly.png",
    },
    to: "https://github.com/N1xev",
  },
]);
</script>

<template>
  <div
    class="container flex flex-col justify-between items-center mx-auto py-8"
  >
    <div class="mb-6">
      <h1 class="text-3xl text-center font-bold">My Blog</h1>
    </div>
    <!-- Posts -->
    <div>
      <UBlogPost
        v-for="(post, index) in posts"
        :key="index"
        :title="post.title"
        :description="post.description"
        :image="post.meta.image"
        :date="formatDate(post.meta?.date)"
        :tags="formatTags(post.meta?.tags)"
        :authors="authors"
        :to="post.path"
        orientation="horizontal"
        class="flex flex-col w-full border-x-0 bg-transparent outline-0 ring-0 border-y-1 border-dashed border-default rounded-none my-4"
      />
    </div>
  </div>
</template>
