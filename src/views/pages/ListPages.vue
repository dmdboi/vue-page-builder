<script lang="ts" setup>
import { onMounted, ref } from "vue";

import DataTable from "@/components/shad/DataTable.vue";

import api from "@/api/api";

import { pageTableColumns } from "@/types/columns";
import type { Page } from "../../types/pages";

const pages = ref<Page[]>([]);

onMounted(async () => {
  pages.value = (await api.pages.list()).data;
});
</script>

<template>
  <div>
    <h1 class="text-2xl">Pages</h1>

    <div class="mt-12">
      <DataTable :columns="pageTableColumns" :data="pages" />
    </div>
  </div>
</template>
