<template>
  <NavHonrizontal />
  <div class="p-8">
    <div class="flex justify-between mb-4">
      <div class="flex flex-row">
        <p class="text-base font-semibold pr-2">Notification</p>
        <div class="flex flex-row">
          <p class="text-gray-400">unread</p>
          <Iconify :icon="ArrowDown" class="text-gray-400 h-full" />
        </div>
      </div>
      <div>
        <p class="hover:text-red-600">Mark all read</p>
      </div>
    </div>
    <div>
      <div class="divide-y">
        <NotificationComponent />
      </div>
    </div>
  </div>
</template>
<script setup>
import NavHonrizontal from "../app-layouts/NavHonrizontal.vue";
import NotificationComponent from "../components/NotificationComponent.vue";
import { Icon, Icon as Iconify } from "@iconify/vue";
const ArrowDown = "iconamoon:arrow-down-2-duotone";
</script>
