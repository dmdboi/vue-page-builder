<template>
  <div class="flex flex-row w-full h-screen">
    <!-- Draggable Items Sidebar -->
    <div class="w-1/5 p-4 bg-gray-100 border-r border-gray-300">
      <!-- Tabs -->
      <div class="flex justify-center mb-4">
        <button @click="currentTab = 'elements'" :class="{ 'bg-blue-500 text-white': currentTab === 'elements' }" class="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded">
          Elements
        </button>
        <button @click="currentTab = 'attributes'" :class="{ 'bg-blue-500 text-white': currentTab === 'attributes' }" class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded">
          Attributes
        </button>
      </div>

      <!-- Draggable List -->
      <DraggableElements v-if="currentTab === 'elements'" />

      <!-- Selected Elements -->
      <AttributesTab v-if="currentTab === 'attributes'" />

      <button @click="resetHTML" class="px-4 py-2 mt-8 text-sm text-white bg-blue-500 rounded">Reset</button>
    </div>

    <!-- Dropzone where HTML gets built -->
    <div class="w-4/5 p-6">
      <VueDraggable
        v-model="currentHTML"
        :group="{
          name: 'elements',
          pull: 'clone',
          put: e => {
            console.log('Put', e);
            return true;
          },
        }"
        @clone="clone"
        @spill="clone"
        item-key="label"
        class="min-h-full p-4 bg-white border border-gray-300 rounded-lg">
        <template v-for="(element, index) in currentHTML" :key="index">
          <!-- Pass the element as prop and handle updates via @update -->
          <NestedRenderer :element="element" @update:element="updateElement(index, $event)" />
        </template>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { VueDraggable } from "vue-draggable-plus";

import AttributesTab from "@/components/AttributesTab.vue";
import NestedRenderer from "@/components/NestedRenderer.vue";
import DraggableElements from "@/components/DraggableElements.vue";

import { useElementStore } from "@/stores/elements";
import { getRandomId } from "@/utils/id";

const elementStore = useElementStore();
const { currentTab, currentHTML } = storeToRefs(elementStore);

function resetHTML() {
  currentHTML.value = [
    {
      id: getRandomId(),
      type: "div",
      content: [
        {
          id: getRandomId(),
          type: "p",
          content: ["This is a paragraph"],
        },
        {
          id: getRandomId(),
          type: "a",
          content: ["Click me"],
          attributes: {
            href: "#",
          },
        },
      ],
    },
  ];
}

function clone(event: any) {
  console.log("Cloned", event);
}

// Function to handle updates from the child component
const updateElement = (index: number, updatedElement: any) => {
  currentHTML.value[index] = updatedElement;
};

watch(currentHTML, () => {
  console.log("Current HTML", currentHTML.value);
});
</script>

<style scoped>
.builder-container {
  display: flex;
}

.draggable-list {
  width: 30%;
  padding: 10px;
  background-color: #f0f0f0;
  border-right: 1px solid #ddd;
}

.dropzone {
  width: 70%;
  padding: 20px;
}

.dropzone h3 {
  margin-top: 0;
  text-align: center;
}
</style>
