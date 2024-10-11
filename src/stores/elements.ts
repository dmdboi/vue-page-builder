import { ref } from "vue";
import { defineStore } from "pinia";
import { getRandomId } from "@/utils/id";

import type { ElementType } from "@/types";

/** ElementStore */
/** This store is used for individual elements within a Component, Page or Template's content array */
export const useElementStore = defineStore("elements", () => {
  const currentHTML = ref([] as ElementType[]);

  const currentTab = ref("elements");

  const selectedElement = ref({} as ElementType);

  /** Set the current component in the store */
  function setCurrentComponent(component: ElementType) {
    // Traverse component and set IDs
    function traverseComponent(content: ElementType[]) {
      content.forEach(item => {
        // Assigning a random ID enables us to track the element in the store and update it
        item.id = getRandomId();

        if (item.content && typeof item.content[0] !== "string") {
          traverseComponent(item.content.filter((child): child is ElementType => typeof child !== "string"));
        }
      });
    }

    traverseComponent(component.content as ElementType[]);

    currentHTML.value = component.content as ElementType[];

    console.log("setCurrentComponent", component);
  }

  /** Set the selected Element in the store */
  function selectElement(element: ElementType) {
    selectedElement.value = element;
    currentTab.value = "attributes";
  }

  /** Clear the currently selected Element from the store */
  function clearSelection() {
    selectedElement.value = {} as ElementType;
  }

  /** Set a class attribute on the element */
  function setClassAttribute(classValue: string) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        class: "",
      };
    }

    /** If the class already exists, remove it */
    if (selectedElement.value.attributes.class && selectedElement.value.attributes.class.includes(classValue)) {
      selectedElement.value.attributes.class = selectedElement.value.attributes.class.replace(classValue, "").trim();
      updateElement(selectedElement.value);
      return;
    }

    /** Remove any similar classes, i.e remove mt-8, if class begins with mt- */
    const similarClassesPrefix = classValue.split("-")[0];

    // Create a regex that matches any class that starts with 'mt-' and is followed by one or more digits
    const regex = new RegExp(`${similarClassesPrefix}\\d+`, "g");

    // Replace any matching class names and trim the result
    selectedElement.value.attributes.class = classValue.replace(regex, "").trim();

    /** Set the class attribute */
    selectedElement.value.attributes.class += " " + classValue;

    updateElement(selectedElement.value);
  }

  function removeClassAttribute(classValue: string) {
    console.log("removeClassAttribute", classValue);

    // Remove the class from the class attribute
    if (selectedElement.value.attributes?.class) {
      selectedElement.value.attributes.class = selectedElement.value.attributes.class.replace(classValue, "").trim();
    }

    console.log("selectedElement.value.attributes.class", selectedElement.value.attributes);

    updateElement(selectedElement.value);
  }

  /** Set a style attribute on the element */
  function setStyleAttribute(e: Event) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        style: {},
      };
    }

    /** Set the style attribute */
    // @ts-ignore
    selectedElement.value.attributes.style = (e.target as HTMLInputElement).value;

    updateElement(selectedElement.value);
  }

  /** Set a src attribute on the element */
  function setSrcAttribute(e: Event) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        src: "",
      };
    }

    /** Set the src attribute */
    selectedElement.value.attributes.src = (e.target as HTMLInputElement).value;

    updateElement(selectedElement.value);
  }

  /** Set an alt attribute on the element */
  function setAltAttribute(e: Event) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        alt: "",
      };
    }

    /** Set the alt attribute */
    selectedElement.value.attributes.alt = (e.target as HTMLInputElement).value;

    updateElement(selectedElement.value);
  }

  /** Set an href attribute on the element */
  function setHrefAttribute(e: Event) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        href: "",
      };
    }

    /** Set the href attribute */
    selectedElement.value.attributes.href = (e.target as HTMLInputElement).value;

    updateElement(selectedElement.value);
  }

  /** Update the element in CurrentHTML */
  function updateElement(element: ElementType) {
    // Traverse the currentHTML array and find the element with the same ID
    // Replace the element with the updated element
    function traverseContent(content: ElementType[]) {
      if (typeof content[0] === "string") {
        return;
      }

      content.forEach(item => {
        if (item.id === element.id) {
          item = element;
        }

        if (item.content && typeof item.content[0] !== "string") {
          traverseContent(item.content.filter((child): child is ElementType => typeof child !== "string"));
        }
      });
    }

    traverseContent(currentHTML.value);
  }

  function deleteElement() {
    console.log("deleteElement", selectedElement.value);

    // TODO: Find the element in the currentHTML array and remove it
    clearSelection();
  }

  return {
    selectedElement,
    selectElement,
    clearSelection,
    setClassAttribute,
    removeClassAttribute,
    setStyleAttribute,
    setSrcAttribute,
    setAltAttribute,
    setHrefAttribute,
    updateElement,
    deleteElement,
    currentTab,
    currentHTML,
    setCurrentComponent,
  };
});
