<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import ReadOnlyViewer from "@/components/readonly/ReadOnlyViewer.vue";
import JSONViewer from "@/components/JSONViewer.vue";

import api from "@/api/api";

import type { Component } from "@/types/components";

const route = useRoute();

const isLoading = ref(true);
const component = ref<Component>();

onMounted(async () => {
  isLoading.value = true;
  component.value = (await api.components.get(route.params.id as string)).data;
  isLoading.value = false;
});
</script>

<template>
  <div>
    <h1 class="text-2xl">Component</h1>

    <div class="mt-12" v-if="!isLoading">
      <h2 class="mb-2 text-xl">Preview</h2>
      <ReadOnlyViewer :content="component!.content" />
    </div>

    <div class="mt-12" v-if="!isLoading">
      <h2 class="mb-2 text-xl">JSON</h2>
      <JSONViewer :content="component!.content" />
    </div>
  </div>
</template>
