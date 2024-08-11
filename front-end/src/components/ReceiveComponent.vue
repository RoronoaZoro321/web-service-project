<template>
    <div class="flex flex-row text-BLACKTEXT bg-indigo-50 p-2 rounded-md mb-2">
        <div class="rounded-lg w-12 flex items-center justify-center">
            <Iconify :icon="DollarSign" class="w-8 h-8" />
        </div>
        <div class="flex-grow">
            <div class="flex flex-row justify-between">
                <h2 class="px-2 ml-2 font-semibold">Top up</h2>
                <span>+ ฿ {{ transactionData.amount }}</span>
            </div>
            <div class="flex justify-between">
                <p class="px-4 text-gray-400">yesterday 12:03 pm</p>
                <p class="text-gray-400">Deposit</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import { defineProps } from "vue";
import Spinner from "./Spinner.vue";

const DollarSign = "healthicons:dollar";

const props = defineProps({
    transactionData: Object,
});
</script>
