<template>
  <div class="flex justify-between py-4 px-4 bg-gray-50 shadow-md">
    <div class="flex flex-row p-1">
      <div
        class="bg-slate-200 w-8 h-8 rounded-md flex items-center justify-center"
      >
        <Iconify
          :icon="ProfileIcon"
          class="bg-slate-200 w-8 h-4 flex justify-center rounded-xl"
        />
      </div>
      <div class="flex mx-2 hover:bg-slate-200 p-1 rounded-md flex-row">
        <span class="mx-4">123-456-789</span>
        <Iconify :icon="ArrowDown" class="text-gray-400 h-full" />
      </div>
    </div>
    <div class="flex flex-row">
      <div
        class="bg-slate-200 w-10 h-10 rounded-md flex items-center justify-center"
      >
        <Iconify
          :icon="BellIcon"
          class="bg-slate-200 flex justify-center rounded-xl"
        />
      </div>

      <button
        class="bg-blue-500 text-white text-sm rounded-md border-none p-2 cursor-pointer mx-2"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
const ProfileIcon = "iconamoon:profile";
const BellIcon = "mingcute:notification-line";
const ArrowDown = "iconamoon:arrow-down-2-duotone";
</script>
