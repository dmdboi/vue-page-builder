<template>
  <div class="mt-4" v-if="currentTab === 'attributes'">
    <h3 class="mb-4 text-xl font-bold">Attributes</h3>

    <!-- SelectedElement -->
    <div>
      Editing <strong>{{ selectedElement.type }}</strong>
    </div>

    <div class="mt-8">
      <!-- Accordion -->
      <Accordion title="General" class="bg-white border rounded">
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
      <Accordion title="Margins" class="mt-2 bg-white border rounded">
        <div class="px-4">
          <Label for="margins">Margins</Label>
          <ClassSelector type="margin" @add="setClassAttribute" @remove="removeClassAttribute" class="mt-1" />
        </div>
      </Accordion>

      <!-- Padding -->
      <Accordion title="Padding" class="mt-2 bg-white border rounded">
        <div class="px-4">
          <Label for="padding">Padding</Label>
          <ClassSelector type="padding" @add="setClassAttribute" @remove="removeClassAttribute" class="mt-1" />
        </div>
      </Accordion>
    </div>

    <!-- Delete -->
    <div class="mt-4">
      <Button @click="deleteElement" class="w-full" variant="destructive"> Delete Element </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useElementStore } from "@/stores/elements";

import ClassSelector from "./shad/ClassSelector.vue";
import Accordion from "./shad/Accordion.vue";
import { Button } from "./ui/button";
import Input from "./shad/Input.vue";
import { Label } from "./ui/label";

const elementStore = useElementStore();
const { setClassAttribute, removeClassAttribute, deleteElement } = elementStore;
const { currentTab, selectedElement } = storeToRefs(elementStore);
</script>
