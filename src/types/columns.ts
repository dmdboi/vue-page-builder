import { h } from "vue";

import type { ColumnDef } from "@tanstack/vue-table";
import type { Component } from "./components";

export const componentTableColumns: ColumnDef<Component>[] = [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-left" }, "Id"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("id"));
    },
  },
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("name"));
    },
  },
  {
    accessorKey: "ref",
    header: () => h("div", { class: "text-left" }, "Ref"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("ref"));
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, [h("a", { class: "text-right text-blue-500 font-medium w-32", href: `/components/${row.getValue("id")}` }, "View")]);
    },
  },
];
