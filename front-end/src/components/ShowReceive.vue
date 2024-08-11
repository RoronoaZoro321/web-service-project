<template>
    <div class="flex justify-between overflow-auto">
        <h1>Transactions</h1>
        <p
            class="cursor-pointer hover:text-red-600"
            @click="goto({ path: '/notification' })"
        >
            See All
        </p>
    </div>
    <div v-if="!haveData" class="p-4">You have no transaction.</div>
    <div v-else class="p-4">
        <ReceiveComponent
            v-for="(transaction, index) in latestTransactions"
            :key="index"
            :transactionData="transaction"
        />
    </div>
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import ReceiveComponent from "./ReceiveComponent.vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { useStore } from "../store/store";
import axios from "axios";

const transactionData = ref(null);
const haveData = ref(false);
const router = useRouter();
const route = useRoute();
const store = useStore();

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

const latestTransactions = computed(() => {
    if (transactionData.value) {
        return transactionData.value.slice(-4).reverse();
    }
    return [];
});

onMounted(() => {
    const accountNumber = { accountNumber: store.currentAccount };

    const fetchTransactionData = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:3000/api/v1/esb/transaction/MyAccTransactions",
                accountNumber,
                { withCredentials: true }
            );

            const data = await response.data;

            transactionData.value = data.data.transactions;

            if (transactionData.value.length > 0) haveData.value = true;
        } catch (error) {
            console.log(error.response.data);
            transactionData.value = null;
        }
    };

    fetchTransactionData();
});
</script>
