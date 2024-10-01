import { ref } from "vue";
import { defineStore } from "pinia";
import type { ElementType } from "@/types";

export const useElementStore = defineStore("elements", () => {
  const currentHTML = ref([
    {
      type: "div",
      content: [
        {
          type: "p",
          content: ["This is a paragraph"],
        },
        {
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
  function setClassAttribute(e: Event) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        class: "",
      };
    }

    /** Set the class attribute */
    selectedElement.value.attributes.class = (e.target as HTMLInputElement).value;

    updateElement(selectedElement.value);
  }

  /** Set a style attribute on the element */
  function setStyleAttribute(style: Record<string, string | number>) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        style: {},
      };
    }

    /** Set the style attribute */
    selectedElement.value.attributes.style = style;

    updateElement(selectedElement.value);
  }

  /** Set a src attribute on the element */
  function setSrcAttribute(src: string) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        src: "",
      };
    }

    /** Set the src attribute */
    selectedElement.value.attributes.src = src;

    updateElement(selectedElement.value);
  }

  /** Set an alt attribute on the element */
  function setAltAttribute(alt: string) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        alt: "",
      };
    }

    /** Set the alt attribute */
    selectedElement.value.attributes.alt = alt;

    updateElement(selectedElement.value);
  }

  /** Set an href attribute on the element */
  function setHrefAttribute(href: string) {
    /** If selectedElement has no attribute object yet */
    if (!selectedElement.value.attributes) {
      selectedElement.value.attributes = {
        href: "",
      };
    }

    /** Set the href attribute */
    selectedElement.value.attributes.href = href;

    updateElement(selectedElement.value);
  }

  /** Update the element in CurrentHTML */
  function updateElement(element: ElementType) {
    const index = currentHTML.value.findIndex(el => el.id === element.id);
    currentHTML.value.splice(index, 1, element);
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
    currentTab,
    currentHTML
  };
});
