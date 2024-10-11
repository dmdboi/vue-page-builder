<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// @ts-ignore
import { JSONToHTML, HTMLToJSON } from "html-to-json-parser";

import PageBuilder from "@/components/PageBuilder.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/shad/Tabs.vue";

import api from "@/api/api";
import { useElementStore } from "@/stores/elements";
import { useToastStore } from "@/stores/toast";

import type { Component } from "@/types/components";

const route = useRoute();
const { setCurrentComponent } = useElementStore();
const toastStore = useToastStore();

const isLoading = ref(true);
const currentTab = ref("Editor");
const component = ref<Component>();

const html = ref("");

async function saveComponent() {
  try {
    await api.components.update(route.params.id as string, component.value);
    toastStore.show("Success", "Component saved successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to save component", "destructive");
  }
}

async function handleHTMLCodeChanges(code: string) {
  html.value = code;
}

onMounted(async () => {
  isLoading.value = true;
  component.value = (await api.components.get(route.params.id as string)).data;

  if (!component.value) {
    toastStore.show("Error", "Component not found", "destructive");
    return;
  }

  html.value = await JSONToHTML(component.value.content[0]);

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
      <!-- Tabs -->
      <Tabs :tabs="['Editor', 'JSON', 'HTML']" v-model="currentTab" />

      <PageBuilder v-if="currentTab === 'Editor'" />

      <div v-if="currentTab === 'JSON'" class="overflow-y-scroll rounded-lg overflow-clip max-h-[48rem]">
        <CodeEditor :code="JSON.stringify(component, null, 2)" mode="json" />
      </div>

      <div v-if="currentTab === 'HTML'" class="overflow-y-scroll rounded-lg overflow-clip max-h-[48rem]">
        <CodeEditor :code="html" mode="html" @update:code="handleHTMLCodeChanges" />
      </div>
    </div>
  </div>
</template>
