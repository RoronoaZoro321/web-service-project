<template>
  <div class="flex justify-between overflow-auto ">
    <h1>Receive</h1>
    <p
      class="cursor-pointer hover:text-red-600"
      @click="goto({ path: '/notification' })"
    >
      See All
    </p>
  </div>
  <div class="p-4">
    <ReceiveComponent /> <ReceiveComponent /><ReceiveComponent />
  </div>
</template>
<script setup>
import { Icon as Iconify } from "@iconify/vue";
import ReceiveComponent from "./ReceiveComponent.vue";

import { useRouter, useRoute, RouterLink } from "vue-router";
const router = useRouter();
const route = useRoute();
function goto(page) {
  if (page.name && page.name !== route.name) {
    router.push({ name: page.name });
    return;
  }
  if (page.path && page.path !== route.path) {
    router.push({ path: page.path });
    return;
  }
}
</script>
