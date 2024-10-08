<template>
  <!-- Draggable wrapper for container elements like div/section -->
  <VueDraggable
    v-if="isContainerElement"
    :class="['drag-area', element.attributes?.class]"
    :tag="element.type"
    v-model="element.content"
    group="elements"
    @click.self="selectElement(element)">
    <!-- Render each child element -->
    <template v-for="(childElement, index) in element.content" :key="index">
      <!-- If string, just render string -->
      <p v-if="typeof childElement === 'string'">{{ childElement }}</p>

      <nested-renderer v-else-if="childElement.content && childElement.content.length > 0" :element="childElement" @update:element="updateChild(index, $event)" />
      <!-- Render leaf elements -->
      <component
        @click.self="selectElement(childElement)"
        v-else
        :is="childElement.type"
        :id="childElement.attributes?.id"
        :class="childElement.attributes?.class"
        :style="childElement.attributes?.style"
        :src="childElement.attributes?.src"
        :alt="childElement.attributes?.alt">
        <template v-if="childElement.type === 'a' || typeof childElement.content === 'string'">
          <a v-if="childElement.type === 'a'" :href="childElement.attributes?.href">{{ childElement.content[0] }}</a>
          <p v-else>{{ childElement.content[0] }}</p>
        </template>
      </component>
    </template>
  </VueDraggable>

  <!-- Leaf elements like img, a, etc. -->
  <component
    @click.self="selectElement(element)"
    v-else
    :is="element.type"
    :id="element.attributes?.id"
    :class="element.attributes?.class"
    :style="element.attributes?.style"
    :src="element.attributes?.src"
    :alt="element.attributes?.alt">
    <!-- String Content for Anchor or Paragraph -->
    <template v-if="typeof element.content[0] === 'string'">
      {{ element.content[0] }}
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";

import type { ElementType } from "@/types";
import { useElementStore } from "@/stores/elements";

interface Props {
  element: ElementType;
}

const { selectElement } = useElementStore();

const props = defineProps<Props>();
const emits = defineEmits(["update:element"]);

// Computed property to handle v-model-like reactivity
const elementContent = computed({
  get: () => props.element.content,
  set: value => emits("update:element", { ...props.element, content: value }),
});

// Check if the element is a container type
const isContainerElement = computed(() => {
  const containerTags = ["div", "section", "ul", "ol", "nav", "header", "footer", "li", "main"];
  return containerTags.includes(props.element.type) && Array.isArray(props.element.content);
});

// Function to emit updates for child elements
const updateChild = (index: number, updatedElement: ElementType) => {
  const updatedContent = [...elementContent.value];
  updatedContent[index] = updatedElement;
  elementContent.value = updatedContent;
};
</script>

<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
  padding: 10px;
}
</style>
