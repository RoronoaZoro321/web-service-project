<template>
  <div id="app">
    <NavHonrizontal />
    <div
      class="relative bg-gradient-to-r from-blue-300 via-emerald-100 to-yellow-100 h-72"
    >
      <div class="flex justify-center items-center h-full">
        <div
          class="relative w-full h-full flex justify-center items-center p-4"
        >
          <img
            src="../assets/card.png"
            alt="Card"
            class="max-w-full max-h-full object-contain"
          />
          <div class="absolute">
            <div>
              <span class="text-white w-full text-xl px-2 py-1 rounded">123456789</span>
              <span class="text-white px-2 py-1 rounded">Roshy Smith</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div class="p-8 text-center">
      <div class=" "></div>
      <div class="mb-8">
        <h2 class="text-sm text-gray-300">Your Balance</h2>
        <p class="text-lg text-BLACKTEXT font-semibold">฿ 30,000.00</p>
      </div>
      <div class="actions-container">
        <button
          class="bg-white hover:bg-gray-100 text-gray-600 flex flex-col justify-center font-semibold py-2 px-4 border border-gray-200 rounded shadow"
          @click="goto({ path: '/topup' })"
        >
          <Iconify :icon="WalletIcon" class="w-8 h-8 text-blue-700 ml-2" />
          Top up
        </button>
        <button
          class="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
          @click="goto({ path: '/transfer' })"
        >
          <Iconify :icon="TransferIcon" class="w-8 h-8 text-red-700 ml-2" />
          Transfer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavHonrizontal from "../app-layouts/NavHonrizontal.vue";
import { Icon as Iconify } from "@iconify/vue";
const WalletIcon = "fluent:wallet-16-filled";
const TransferIcon = "wpf:bank-cards";
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

<style scoped>
.main-content {
  text-align: center;
  padding: 2rem;
}

.actions-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
