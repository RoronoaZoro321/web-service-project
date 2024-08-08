<template>
    <Vueform
      size="md"
      :display-errors="false"
      add-class="vf-create-account"
    >
      <StaticElement
        name="register_title"
        tag="h3"
        content="Enter PIN"
        align="center"
      />
      <TextElement
        name="PIN"
        input-type="password"
        label="PIN"
      />
      <ButtonElement
        name="reset"
        button-label="Back"
        :secondary="true"
        :resets="true"
        :columns="{
          container: 9,
        }"
        @click="goto({ path: '/transfer' })"
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
        @click="goto({ path: '/checkout' })"
      />
    </Vueform>
  </template>
  <script setup>
import { useRouter, useRoute, RouterLink } from "vue-router"

const router = useRouter()
const route = useRoute()

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
  