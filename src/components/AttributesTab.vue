<template>
  <div class="mt-4" v-if="currentTab === 'attributes'">
    <h3 class="mb-4 text-xl font-bold">Attributes</h3>

    <!-- SelectedElement -->
    <div>
      Editing <strong>{{ selectedElement.type }}</strong>
    </div>

    <!-- Classes Input -->
    <div class="mt-4">
      <label for="classes" class="block text-sm font-bold">Classes</label>
      <input @change="setClassAttribute" type="text" id="classes" class="w-full px-4 py-2 mt-1 border border-gray-300 rounded" />
    </div>

    <!-- Styles Input -->
    <div class="mt-4">
      <label for="styles" class="block text-sm font-bold">Styles</label>
      <input @change="setStyleAttribute" type="text" id="styles" class="w-full px-4 py-2 mt-1 border border-gray-300 rounded" />
    </div>

    <!-- Delete -->
    <div class="mt-4">
      <button class="px-4 py-2 text-sm text-white bg-red-500 rounded" @click="deleteElement" type="button">Delete Element</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useElementStore } from "@/stores/elements";

const elementStore = useElementStore();
const { setClassAttribute, setStyleAttribute, deleteElement } = elementStore;
const { currentTab, selectedElement } = storeToRefs(elementStore);
</script>
