<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label :for="label" v-if="label">{{ label }}</Label>
    <Input :id="label" :type="label" class="w-full" />
  </div>
</template>
