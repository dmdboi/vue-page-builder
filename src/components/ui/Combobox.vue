<script setup lang="ts">
import { Check, ChevronsUpDown } from "lucide-vue-next";

import { ref } from "vue";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const open = ref(false);
const value = ref("");
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="outline" role="combobox" :aria-expanded="open" class="w-[200px] justify-between">
        {{ value ? frameworks.find(framework => framework.value === value)?.label : "Select framework..." }}

        <ChevronsUpDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command v-model="value">
        <CommandInput placeholder="Search framework..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem v-for="framework in frameworks" :key="framework.value" :value="framework" @select="open = false">
              <Check :class="cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')" />
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
