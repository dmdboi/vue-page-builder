<template>
  <div class="flex flex-row h-screen">
    <!-- Input -->
    <div class="w-1/2 h-screen bg-gray-100">
      <div class="px-12 pt-16">
        <textarea
          @input="setJSON"
          v-model="html"
          class="w-full h-full p-4 font-mono text-lg bg-white border border-gray-300 rounded-xl"
          placeholder="Type some HTML here..."></textarea>
      </div>
    </div>

    <!-- HTML Renderer -->
    <div class="w-1/2 h-screen bg-gray-100">
      <div class="p-4 mx-12 mt-16 bg-white border rounded-xl">
        <!-- Loop through the parsed JSON structure and render each element -->
        <EditableElement :element="json" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { HTMLToJSON } from "html-to-json-parser";

import EditableElement from "./EditableElement.vue";

const html = ref("<div><p>hello world</p></div>");
const json = ref({});

async function setJSON() {
  if (!html.value) return;

  json.value = await HTMLToJSON(html.value, false);
  console.log(json.value);
}
</script>
