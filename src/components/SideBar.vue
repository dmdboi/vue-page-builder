<script setup lang="ts">
import { ref } from "vue";

import { cn } from "@/utils";
import { Button } from "./ui/button";
import { useRouter } from "vue-router";

const router = useRouter();

const activeRoute = ref<string>("");

const routes = [
  { name: "Home", path: "/" },
  { name: "Pages", path: "/pages" },
  { name: "Templates", path: "/templates" },
  { name: "Components", path: "/components" },
];

const isActive = (route: string) => activeRoute.value.includes(route);

const goTo = (route: string) => {
  activeRoute.value = route;
  router.push(route);
};
</script>

<template>
  <div :class="cn('pb-12 h-screen bg-secondary/40', $attrs.class ?? '')">
    <div class="py-4 space-y-4">
      <div class="px-3 py-2">
        <h2 class="px-4 mb-2 text-lg font-semibold tracking-tight">My Site</h2>
        <div class="space-y-1">
          <Button :variant="isActive(route.path) ? 'outline' : 'ghost'" class="justify-start w-full" v-for="route in routes" @click="goTo(route.path)" :key="route.path">
            {{ route.name }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
