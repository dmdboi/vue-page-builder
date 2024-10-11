<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useElementStore } from "@/stores/elements";

import ClassSelector from "./shad/ClassSelector.vue";
import Accordion from "./shad/Accordion.vue";
import Slider from "./shad/Slider.vue";
import Input from "./shad/Input.vue";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const elementStore = useElementStore();
const { setClassAttribute, deleteElement } = elementStore;
const { selectedElement } = storeToRefs(elementStore);
</script>

<template>
  <!-- SelectedElement -->
  <div>
    Editing <strong>{{ selectedElement.type }}</strong>
  </div>

  <div class="mt-8">
    <!-- Accordion -->
    <Accordion title="General" class="border rounded-lg overflow-clip">
      <div class="px-4">
        <Input label="ID" v-bind:model-value="selectedElement.id" />
      </div>

      <div class="px-4 mt-4">
        <Label for="padding">Background Color</Label>
        <ClassSelector type="background" @add="setClassAttribute" @remove="setClassAttribute" class="mt-1" />
      </div>

      <div class="px-4 mt-4">
        <Label for="padding">Color</Label>
        <ClassSelector type="text" @add="setClassAttribute" @remove="setClassAttribute" class="mt-1" />
      </div>
    </Accordion>

    <!-- Margins -->
    <Accordion title="Margins" class="mt-2 border rounded-lg overflow-clip">
      <div class="px-4 mb-4">
        <Label for="margins">Top</Label>
        <Slider
          @update="setClassAttribute"
          :values="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          :classes="['mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'mt-6', 'mt-7', 'mt-8', 'mt-9', 'mt-10']"
          class="mt-2" />
      </div>

      <div class="px-4 mb-4">
        <Label for="margins">Left</Label>
        <Slider @update="setClassAttribute" :classes="['ml-0', 'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5', 'ml-6', 'ml-7', 'ml-8', 'ml-9', 'ml-10']" class="mt-2" />
      </div>

      <div class="px-4 mb-4">
        <Label for="margins">Right</Label>
        <Slider @update="setClassAttribute" :classes="['mr-0', 'mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5', 'mr-6', 'mr-7', 'mr-8', 'mr-9', 'mr-10']" class="mt-2" />
      </div>

      <div class="px-4 mb-4">
        <Label for="margins">Bottom</Label>
        <Slider @update="setClassAttribute" :classes="['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'mb-6', 'mb-7', 'mb-8', 'mb-9', 'mb-10']" class="mt-2" />
      </div>
    </Accordion>

    <!-- Padding -->
    <Accordion title="Padding" class="mt-2 border rounded-lg overflow-clip">
      <div class="px-4 mb-4">
        <Label for="margins">Top</Label>
        <Slider @update="setClassAttribute" :classes="['pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5', 'pt-6', 'pt-7', 'pt-8', 'pt-9', 'pt-10']" class="mt-2" />
      </div>

      <div class="px-4 mb-4">
        <Label for="margins">Left</Label>
        <Slider @update="setClassAttribute" :classes="['pl-0', 'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5', 'pl-6', 'pl-7', 'pl-8', 'pl-9', 'pl-10']" class="mt-2" />
      </div>

      <div class="px-4 mb-4">
        <Label for="margins">Right</Label>
        <Slider @update="setClassAttribute" :classes="['pr-0', 'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5', 'pr-6', 'pr-7', 'pr-8', 'pr-9', 'pr-10']" class="mt-2" />
      </div>

      <div class="px-4 mb-4">
        <Label for="margins">Bottom</Label>
        <Slider @update="setClassAttribute" :classes="['pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'pb-6', 'pb-7', 'pb-8', 'pb-9', 'pb-10']" class="mt-2" />
      </div>
    </Accordion>
  </div>

  <!-- Delete -->
  <div class="mt-4">
    <Button @click="deleteElement" class="w-full" variant="destructive"> Delete Element </Button>
  </div>
</template>
