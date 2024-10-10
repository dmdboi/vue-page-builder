<script setup lang="ts">
import { storeToRefs } from "pinia";
import { VueDraggable } from "vue-draggable-plus";

import NestedRenderer from "@/components/NestedRenderer.vue";

import { useElementStore } from "@/stores/elements";

const elementStore = useElementStore();
const { currentHTML } = storeToRefs(elementStore);

// Function to handle updates from the child component
const updateElement = (index: number, updatedElement: any) => {
  currentHTML.value[index] = updatedElement;
};
</script>

<template>
  <div class="flex flex-row w-full">
    <!-- Dropzone where HTML gets built -->
    <div class="w-full">
      <div class="w-full h-11 rounded-t-lg border-2 border-gray-200 bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
        <span class="w-3 h-3 bg-red-500 rounded-full"></span>
        <span class="w-3 h-3 bg-orange-500 rounded-full"></span>
        <span class="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>

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
        item-key="label"
        class="min-h-full p-4 rounded-b-lg bg-secondary">
        <template v-for="(element, index) in currentHTML" :key="index">
          <!-- Pass the element as prop and handle updates via @update -->
          <NestedRenderer :element="element" @update:element="updateElement(index, $event)" />
        </template>
      </VueDraggable>
    </div>
  </div>
</template>

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
