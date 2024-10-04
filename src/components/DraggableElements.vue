<template>
  <h2 class="mb-4 text-xl font-bold">Elements</h2>
  <VueDraggable v-model="availableItems" :group="{ name: 'elements', pull: 'clone', put: false }" item-key="label" class="grid grid-cols-1 gap-2 md:grid-cols-2">
    <div v-for="(item, index) in availableItems" :key="index" class="flex items-center justify-center h-24 bg-white border rounded-2xl">
      <div>{{ item.label }}</div>
    </div>
  </VueDraggable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";

const availableItems = ref([
  {
    type: "p",
    label: "Paragraph",
    content: ["New Paragraph"],
    attributes: {
      class: "text-lg",
    },
  },
  { type: "div", label: "Section", content: ["New Div"] },
  { type: "h1", label: "Heading", content: ["New Heading"] },
  {
    label: "Navbar",
    type: "nav",
    content: [
      {
        type: "ul",
        attributes: {
          class: "flex space-x-4",
        },
        content: [
          {
            type: "li",
            content: [
              {
                type: "a",
                content: ["Home"],
                attributes: { href: "/" },
              },
            ],
          },
          {
            type: "li",
            content: [
              {
                type: "a",
                content: ["About"],
                attributes: { href: "/about", class: "text-blue-500" },
              },
            ],
          },
          { type: "li", content: [{ type: "a", content: ["Contact"], attributes: { href: "/contact" } }] },
        ],
      },
    ],
  },
  {
    label: "Image",
    type: "img",
    content: [],
    attributes: {
      src: "https://via.placeholder.com/150",
      alt: "Placeholder Image",
    },
  },
  {
    label: "Button",
    type: "button",
    content: ["Click Me"],
    attributes: {
      class: "bg-blue-500 text-white px-4 py-2 rounded",
    },
  },
  {
    label: "Grid",
    type: "div",
    content: [
      {
        type: "div",
        attributes: {
          class: "grid grid-cols-2 gap-4 w-full",
          id: "grid",
        },
        content: [
          {
            type: "div",
            attributes: {
              class: "col-span-1",
              id: "col1",
            },
            content: [
              {
                type: "h1",
                content: ["Heading 1"],
              },
              {
                type: "p",
                content: ["Item 1"],
              },
            ],
          },
          {
            type: "div",
            attributes: {
              class: "col-span-1",
              id: "col2",
            },
            content: [
              {
                type: "h1",
                content: ["Heading 2"],
              },
              {
                type: "p",
                content: ["Item 2"],
              },
            ],
          },
        ],
      },
    ],
  },
]);
</script>
