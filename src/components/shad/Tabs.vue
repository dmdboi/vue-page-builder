<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useElementStore } from "@/stores/elements";
import { storeToRefs } from "pinia";

const props = defineProps<{
  tabs: string[];
}>();

const { currentTab } = storeToRefs(useElementStore());
</script>

<template>
  <Tabs :default-value="tabs[0]" :model-value="currentTab">
    <TabsList>
      <TabsTrigger :value="tab" v-for="tab in props.tabs" @click="currentTab = tab" :key="tab"> {{ tab }} </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in props.tabs" :key="tab" :value="tab">
      <slot :name="tab" />
    </TabsContent>
  </Tabs>
</template>
