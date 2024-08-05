<template>
    <div id="app">
      <main class="main-content">
        <div class="card-container">
          <!-- <img src="@/assets/card.png" alt="Card" class="card" /> -->
        </div>
        <div class="balance-container">
          <h2>Your Balance</h2>
          <p>฿ 30,000.00</p>
        </div>
        <div class="actions-container">
          <button class="bg-white  hover:bg-gray-100 text-gray-600 flex flex-col justify-center font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            <Iconify :icon="WalletIcon"  class="w-8 h-8 text-blue-700 ml-2"/>
            Top up</button>
          <button class="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            <Iconify :icon="TransferIcon" class="w-8 h-8 text-red-700 ml-2"/>
            Transfer</button>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
import { Icon as Iconify } from "@iconify/vue"
const WalletIcon = "fluent:wallet-16-filled"
const TransferIcon = "wpf:bank-cards"
</script>
  
  <style scoped>
  
  .main-content {
    text-align: center;
    padding: 2rem;
  }
  
  .card-container {
    margin: 2rem 0;
  }
  
  .card {
    max-width: 100%;
  }
  
  .balance-container h2 {
    margin-top: 0;
  }
  
  .actions-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  </style>
  