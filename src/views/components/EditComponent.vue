<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
// @ts-ignore
import { HTMLToJSON } from "html-to-json-parser";

import PageBuilder from "@/components/PageBuilder.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/shad/Tabs.vue";

import api from "@/api/api";
import { useComponentStore } from "@/stores/components";
import { useToastStore } from "@/stores/toast";
import router from "@/router";

const route = useRoute();
const componentStore = useComponentStore();
const { component } = storeToRefs(componentStore);
const toastStore = useToastStore();

const isLoading = ref(true);
const currentTab = ref("Editor");

const html = ref("");

async function saveComponent() {
  try {
    const response = (await api.components.update(route.params.id as string, component.value)).data;

    if (!response) {
      throw new Error("Failed to save component");
    }

    componentStore.setComponent(response);
    html.value = await componentStore.getContentInHTML();

    toastStore.show("Success", "Component saved successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to save component", "destructive");
  }
}

/** Called from CodeEditor when HTML code is saved */
async function handleHTMLUpdate(code: string) {
  try {
    // Remove all newlines and whitespace
    const cleanedCode = code.replace(/\n/g, "").replace(/\s\s+/g, "");

    const json = await HTMLToJSON(cleanedCode);

    if (!json) {
      throw new Error("Failed to parse HTML");
    }

    componentStore.updateComponentProperty("content", [json]);
    html.value = code;

    toastStore.show("Success", "HTML updated successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to update HTML", "destructive");
  }
}

onMounted(async () => {
  isLoading.value = true;

  const response = (await api.components.get(route.params.id as string)).data;

  if (!response) {
    return router.push("/components");
  }

  await componentStore.setComponent(response);
  html.value = await componentStore.getContentInHTML();

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

      <PageBuilder v-if="currentTab === 'Editor'" v-model="component.content" class="mt-4" @update:modelValue="component = $event" />

      <div v-if="currentTab === 'JSON'" class="overflow-y-scroll rounded-lg overflow-clip max-h-[48rem]">
        <CodeEditor :code="JSON.stringify(component, null, 2)" mode="json" />
      </div>

      <div v-if="currentTab === 'HTML'" class="overflow-y-scroll rounded-lg overflow-clip max-h-[48rem]">
        <CodeEditor :code="html" mode="html" @update:code="handleHTMLUpdate" />
      </div>
    </div>
  </div>
</template>
