<template>
  <component :is="elementType" @click.stop="editElement">
    <template v-for="(item, index) in element.content" :key="index">
      <template v-if="typeof item === 'object'">
        <EditableElement :element="item" />
      </template>
      <span v-else-if="item.trim()">{{ item }}</span>
    </template>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Props to receive the element data from parent
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});

// State for managing edit mode
const isEditing = ref(false);
const editableContent = ref("");

// Computed property for defining the element type
const elementType = computed(() => props.element.type || "div");

// Function to enter edit mode
function editElement() {
  // Only enter edit mode if there is string content to edit
  if (props.element.content.some(item => typeof item === "string")) {
    isEditing.value = true;
    editableContent.value = props.element.content.filter(item => typeof item === "string" && item.trim() !== "").join(""); // Join all text nodes into one for editing
  }
}

// Function to save changes and exit edit mode
function saveChanges() {
  isEditing.value = false;

  // Update the content with the new edited value
  props.element.content = props.element.content.map(item => (typeof item === "string" && item.trim() ? editableContent.value : item));
}
</script>
