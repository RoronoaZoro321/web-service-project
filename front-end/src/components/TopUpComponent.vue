<template>
  <Vueform size="md" :display-errors="false" add-class="vf-create-account">
    <StaticElement
      name="register_title"
      tag="h3"
      content="Top up"
      align="center"
    />
    <TextElement
      name="ID number"
      label="ID number"
      placeholder="Enter ID number"
    />
    <div class="w-full">
      <div class="row-span-6"></div>
      <Iconify :icon="ArrowDown" class="col-span-6" />
    </div>
    <div
      class="bg-gray-100 text-BLACKTEXT col-span-12 h-12 rounded-md justify-center flex items-center font-semibold"
    >
      <span>฿ 1,000</span>
    </div>
    <ButtonElement
      name="reset"
      button-label="Back"
      @click="goto({ path: '/balance' })"
      :secondary="true"
      :resets="true"
      :columns="{
        container: 9,
      }"
    />

    <ButtonElement
      name="transfer"
      :submits="true"
      button-label="Next"
      :full="true"
      size="md"
      :columns="{
        container: 3,
      }"
    />
  </Vueform>
</template>
<script setup>
import { Icon as Iconify } from "@iconify/vue";
const ArrowDown = "charm:arrow-down";
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
