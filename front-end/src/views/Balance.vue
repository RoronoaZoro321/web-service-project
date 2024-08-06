<template>
  <div id="app">
    <!-- <NavHonrizontal/> -->
    <main class="p-8 text-center">
      <div class=" w-96 ">
        <div class="grid justify-items-center">
          <img src="../assets/card.png" alt="Card" class="card" />
        </div>
      </div>
      <div class="mb-8">
        <h2>Your Balance</h2>
        <p>฿ 30,000.00</p>
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
    </main>
  </div>
</template>

<script setup>
import NavHonrizontal from '../app-layouts/NavHonrizontal.vue'
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
