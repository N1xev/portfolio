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
    class="container flex flex-col justify-between items-center mx-auto "
  >
    <div class="flex w-full items-center justify-between border-b border-dashed border-gray-700 px-4 sm:px-6 lg:px-8 py-6">
      <div>
      <h1 class="text-3xl text-center font-bold">My Blog</h1>
      </div>

      <Icon name="i-simple-icons:ollama" size="25"/>

      <div>
      <UContentSearchButton :collapsed="false" />
      </div>
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
        class="flex flex-col w-full border-x-0 bg-transparent outline-0 ring-0 border-b last:border-b-0 border-dashed border-gray-700 rounded-none"
      />
    </div>
  </div>
</template>
