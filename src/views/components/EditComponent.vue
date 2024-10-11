<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { Button } from "@/components/ui/button";

import api from "@/api/api";
import { useElementStore } from "@/stores/elements";

import type { Component } from "@/types/components";
import PageBuilder from "@/components/PageBuilder.vue";
import { useToastStore } from "@/stores/toast";

const route = useRoute();
const { setCurrentComponent } = useElementStore();
const toastStore = useToastStore();

const isLoading = ref(true);
const component = ref<Component>();

async function saveComponent() {
  try {
    await api.components.update(route.params.id as string, component.value);
    toastStore.show("Success", "Component saved successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to save component", "destructive");
  }
}

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
        <Button variant="default" @click="saveComponent"> Save </Button>
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
