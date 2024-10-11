<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { Button } from "@/components/ui/button";

import api from "@/api/api";
import { useElementStore } from "@/stores/elements";

import type { Component } from "@/types/components";
import PageBuilder from "@/components/PageBuilder.vue";

const route = useRoute();
const { setCurrentComponent } = useElementStore();

const isLoading = ref(true);
const component = ref<Component>();

onMounted(async () => {
  isLoading.value = true;
  component.value = (await api.components.get(route.params.id as string)).data;

  // @ts-ignore
  setCurrentComponent(component.value);
  isLoading.value = false;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl">Component</h1>

      <div>
        <Button variant="default" @click=""> Save </Button>
      </div>
    </div>

    <div class="mt-12" v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div class="mt-12" v-if="!isLoading">
      <PageBuilder />
    </div>
  </div>
</template>
