import { ref } from "vue";
import { defineStore } from "pinia";
import type { ElementType } from "@/types";
import { getRandomId } from "@/utils/id";

export const useElementStore = defineStore("elements", () => {
  const currentHTML = ref([
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
  ] as ElementType[]);

  const currentTab = ref("elements");

  const selectedElement = ref({} as ElementType);

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

    console.log("setClassAttribute", selectedElement.value.attributes.class, classValue);

    /** If the class already exists, remove it */
    if (selectedElement.value.attributes.class && selectedElement.value.attributes.class.includes(classValue)) {
      selectedElement.value.attributes.class = selectedElement.value.attributes.class.replace(classValue, "").trim();
      return;
    }

    /** Set the class attribute */
    selectedElement.value.attributes.class += " " + classValue;

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
    const index = currentHTML.value.findIndex(el => el.id === element.id);
    currentHTML.value.splice(index, 1, element);
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
    setStyleAttribute,
    setSrcAttribute,
    setAltAttribute,
    setHrefAttribute,
    updateElement,
    deleteElement,
    currentTab,
    currentHTML,
  };
});
