<template>
    <div v-if="isLoading">
        <Spinner />
    </div>
    <div v-else id="app">
        <NavHonrizontal v-if="accountsData" />
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
                            <span
                                class="text-white w-full text-xl px-2 py-1 rounded"
                                >{{ store.currentAccount }}</span
                            >
                            <span class="text-white px-2 py-1 rounded">{{
                                userData?.data.user.name
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-8 text-center">
            <div class=" "></div>
            <div class="mb-8">
                <h2 class="text-sm text-gray-300">Your Balance</h2>
                <p class="text-lg text-BLACKTEXT font-semibold">
                    ฿ {{ store.balance }}
                </p>
            </div>
            <div class="actions-container">
                <button
                    class="bg-white hover:bg-gray-100 text-gray-600 flex flex-col justify-center font-semibold py-2 px-4 border border-gray-200 rounded shadow"
                    @click="goto({ path: '/topup' })"
                >
                    <Iconify
                        :icon="WalletIcon"
                        class="w-8 h-8 text-blue-700 ml-2"
                    />
                    Top up
                </button>
                <button
                    class="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
                    @click="goto({ path: '/transfer' })"
                >
                    <Iconify
                        :icon="TransferIcon"
                        class="w-8 h-8 text-red-700 ml-2"
                    />
                    Transfer
                </button>
            </div>
        </div>
        <AppFail v-if="isFail" :responseData="responseData" />
        <CreateAccount v-if="isCreating" :status="creatingStatus" />
    </div>
    <div class="flex justify-center">
        <div
            class="border-solid border-2 border-slate-100 p-6 rounded-lg space-y-4 w-[32rem]"
        >
            <ShowReceive v-if="isLoadingTransaction" />
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import NavHonrizontal from "../app-layouts/NavHonrizontal.vue";
import { Icon as Iconify } from "@iconify/vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import ShowReceive from "../components/ShowReceive.vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import AppFail from "../components/AppFail.vue";
import CreateAccount from "../components/CreateAccount.vue";
import { useStore } from "../store/store";

const WalletIcon = "fluent:wallet-16-filled";
const TransferIcon = "wpf:bank-cards";

const store = useStore();

const userData = ref(null);
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const responseData = ref(null);
const isFail = ref(false);
const isCreating = ref(false);
const creatingStatus = ref(false);
const accountsData = ref(null);
const isLoadingTransaction = ref(false);

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

const fetchUserData = async () => {
    try {
        const response = await axios.get(
            "http://127.0.0.1:3000/api/v1/esb/users/profile",
            { withCredentials: true }
        );

        const data = await response.data;

        userData.value = data;
    } catch (error) {
        console.log(error);
    }
};

onBeforeMount(() => {
    // Handle no sessId
    const jwtCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sessionId="));
    if (!jwtCookie) {
        router.push("/");
    }

    // Handle no account
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:3000/api/v1/esb/users/profile",
                { withCredentials: true }
            );

            const data = await response.data;
            const userId = data.data.user._id;
            const accountList = data.data.user.accounts;
            const hasAccount = accountList.length !== 0;

            if (!hasAccount) {
                isCreating.value = true;

                try {
                    const response = await axios.post(
                        "http://127.0.0.1:3000/api/v1/esb/users/accounts/createAccount",
                        userId,
                        { withCredentials: true }
                    );

                    setTimeout(() => {
                        creatingStatus.value = true;
                    }, 3000);

                    setTimeout(() => {
                        isCreating.value = false;
                        window.location.reload();
                    }, 6000);
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchUserData();
});

onMounted(() => {
    const fetchUserData = async () => {
        // fetch user data
        isLoading.value = true;

        try {
            const response = await axios.get(
                "http://127.0.0.1:3000/api/v1/esb/users/profile",
                { withCredentials: true }
            );

            const data = await response.data;

            userData.value = data;
        } catch (error) {
            // Handle anonymous user
            isFail.value = true;

            try {
                await axios.get(
                    "http://127.0.0.1:3000/api/v1/esb/auth/logout",
                    {
                        withCredentials: true,
                    }
                );

                setTimeout(() => {
                    router.push("/");
                    isFail.value = false;
                }, 3000);
            } catch (error) {
                console.log("Error: " + error);
            }
        } finally {
            isLoading.value = false;
        }
    };

    const fetchAccountData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:3000/api/v1/esb/users/accounts/getAccountsByUserId",
                { withCredentials: true }
            );

            const data = await response.data;

            accountsData.value = data;

            const accountsList = data.data.accounts;

            store.accountNumberList = accountsList;
            store.currentAccount = accountsList[0].accountNumber;
            store.balance = accountsList[0].balance;

            isLoadingTransaction.value = true;
        } catch (error) {
            console.log(error);
        }
    };

    fetchUserData();

    fetchAccountData();
});

// Watch for changes in store.currentAccount
watch(
    () => store.currentAccount,
    async (newAccount) => {
        await fetchUserData();
        if (accountsData.value && newAccount) {
            const selectedAccount = accountsData.value.data.accounts.find(
                (account) => account.accountNumber === newAccount
            );

            if (selectedAccount) {
                store.balance = selectedAccount.balance;
                store.currentAccountName = userData.value.data.user.name;
                // Additional actions you want to perform with the selected account data
            }
        }
    }
);
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
