<script setup lang="ts">
import { onMounted } from "vue";

import grapesjs from "grapesjs";

import "grapesjs/dist/css/grapes.min.css";

import plugin from "@/grape";

onMounted(() => {
  const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: "#gjs",
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    plugins: [plugin],
    styleManager: {
      sectors: [
        {
          name: "General",
          open: false,
          buildProps: ["float", "display", "position", "top", "right", "left", "bottom"],
        },
        {
          name: "Flex",
          open: false,
          buildProps: ["flex-direction", "flex-wrap", "justify-content", "align-items", "align-content", "order", "flex-basis", "flex-grow", "flex-shrink", "align-self"],
        },
        {
          name: "Dimension",
          open: false,
          buildProps: ["width", "height", "max-width", "min-height", "margin", "padding"],
        },
        {
          name: "Typography",
          open: false,
          buildProps: ["font-family", "font-size", "font-weight", "letter-spacing", "color", "line-height", "text-align", "text-shadow"],
          properties: [
            {
              property: "text-align",
              list: [
                { value: "left", className: "fa fa-align-left",  id: "text-left" },
                { value: "center", className:  "fa fa-align-center", id: "text-center" },
                { value: "right", className: "fa fa-align-right", id: "text-right" },
                { value: "justify", className: "fa fa-align-justify", id: "text-justify" },
              ],
            },
          ],
        },
        {
          name: "Decorations",
          open: false,
          buildProps: ["border-radius-c", "background-color", "border-radius", "border", "box-shadow", "background"],
        },
        {
          name: "Extra",
          open: false,
          buildProps: ["transition", "perspective", "transform"],
        },
      ],
    },
  });
});
</script>

<template>
  <div id="gjs" style="overflow: hidden" class="h-screen">
    <div class="panel">
      <h1 class="welcome">Welcome to</h1>
      <div class="big-title">
        <svg class="logo" viewBox="0 0 100 100">
          <path
            d="M40 5l-12.9 7.4 -12.9 7.4c-1.4 0.8-2.7 2.3-3.7 3.9 -0.9 1.6-1.5 3.5-1.5 5.1v14.9 14.9c0 1.7 0.6 3.5 1.5 5.1 0.9 1.6 2.2 3.1 3.7 3.9l12.9 7.4 12.9 7.4c1.4 0.8 3.3 1.2 5.2 1.2 1.9 0 3.8-0.4 5.2-1.2l12.9-7.4 12.9-7.4c1.4-0.8 2.7-2.2 3.7-3.9 0.9-1.6 1.5-3.5 1.5-5.1v-14.9 -12.7c0-4.6-3.8-6-6.8-4.2l-28 16.2" />
        </svg>
        <span>GrapesJS</span>
      </div>
      <div class="description">
        This is a demo content from index.html. For the development, you shouldn't edit this file, instead you can copy and rename it to _index.html, on next server start the new
        file will be served, and it will be ignored by git.
      </div>
    </div>
  </div>
</template>

<style>
.panel {
  width: 90%;
  max-width: 700px;
  border-radius: 3px;
  padding: 30px 20px;
  margin: 150px auto 0px;
  background-color: #d983a6;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  color: rgba(255, 255, 255, 0.75);
  font: caption;
  font-weight: 100;
}

.welcome {
  text-align: center;
  font-weight: 100;
  margin: 0px;
}

.logo {
  width: 70px;
  height: 70px;
  vertical-align: middle;
}

.logo path {
  pointer-events: none;
  fill: none;
  stroke-linecap: round;
  stroke-width: 7;
  stroke: #fff;
}

.big-title {
  text-align: center;
  font-size: 3.5rem;
  margin: 15px 0;
}

.description {
  text-align: justify;
  font-size: 1rem;
  line-height: 1.5rem;
}
</style>
