<template>
    <div class="flex justify-between py-4 px-4 bg-gray-50 shadow-md">
        <div class="flex flex-row p-1">
            <div
                class="bg-slate-200 w-8 h-8 rounded-md flex items-center justify-center"
            >
                <Iconify
                    :icon="ProfileIcon"
                    class="bg-slate-200 w-8 h-4 flex justify-center rounded-xl"
                />
            </div>
            <div v-if="isLoading" class="relative">
                <Spinner />
            </div>
            <div v-else class="relative">
                <div
                    class="flex mx-2 hover:bg-slate-200 p-1 rounded-md flex-row cursor-pointer"
                    @click="toggleDropdown"
                >
                    <span class="mx-4">{{ store.currentAccount }}</span>
                    <Iconify :icon="ArrowDown" class="text-gray-400 h-full" />
                </div>

                <div
                    v-if="isOpen"
                    class="absolute bg-white shadow-md rounded-md mt-1 w-full z-10"
                >
                    <div
                        v-for="account in accounts"
                        :key="account"
                        class="px-4 py-2 hover:bg-slate-200 cursor-pointer"
                        @click="selectAccount(account)"
                    >
                        {{ account.accountNumber }}
                    </div>
                    <div
                        class="block px-4 py-2 hover:bg-slate-200 dark:hover:text-BLACKTEXT rounded-md cursor-pointer"
                        @click="createNewAccount()"
                    >
                        Create Account
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row">
            <div
                class="bg-slate-200 w-10 h-10 rounded-md flex items-center justify-center cursor-pointer"
                @click="goto({ path: '/notification' })"
            >
                <Iconify
                    :icon="BellIcon"
                    class="bg-slate-200 flex justify-center rounded-xl"
                />
            </div>

            <button
                class="bg-blue-500 text-white text-sm rounded-md border-none p-2 cursor-pointer mx-2"
                @click="logout"
            >
                <p v-if="!isLogout">Logout</p>
                <p v-else>Logging out...</p>
            </button>
        </div>
        <CreateAccount v-if="isCreating" :status="creatingStatus" />
    </div>
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import { useStore } from "../store/store";
import CreateAccount from "../components/CreateAccount.vue";

const ProfileIcon = "iconamoon:profile";
const BellIcon = "mingcute:notification-line";
const ArrowDown = "iconamoon:arrow-down-2-duotone";
const store = useStore();

const router = useRouter();
const isLoading = ref(false);
const isOpen = ref(false);
const isLogout = ref(false);

// Setup the state
const accounts = ref([]); // Example accounts
const creatingStatus = ref(false);
const isCreating = ref(false);

// Toggle the dropdown visibility
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

// Select an account and close the dropdown
const selectAccount = (account) => {
    store.currentAccount = account.accountNumber;
    store.balance = account.balance;

    isOpen.value = false;
};

const fetchUserData = async () => {
    try {
        const response = await axios.get(
            "http://127.0.0.1:3000/api/v1/esb/users/profile",
            { withCredentials: true }
        );

        const data = await response.data;

        const userId = data.data.user._id;

        return userId;
    } catch (error) {
        console.log(error);
    }
};

const createNewAccount = async () => {
    try {
        const userId = await fetchUserData();

        await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/users/accounts/createAccount",
            userId,
            {
                withCredentials: true,
            }
        );

        isCreating.value = true;

        setTimeout(() => {
            creatingStatus.value = true;
        }, 3000);

        setTimeout(() => {
            isCreating.value = false;
            window.location.reload();
        }, 6000);
    } catch (error) {
        console.log("Error: " + error);
    }
};

const logout = async () => {
    try {
        await axios.get("http://127.0.0.1:3000/api/v1/esb/auth/logout", {
            withCredentials: true,
        });

        isLogout.value = true;

        setTimeout(() => {
            router.push("/");
        }, 1000);
    } catch (error) {
        console.log("Error: " + error);
    }
};

onMounted(() => {
    if (store.accountNumberList) {
        accounts.value = store.accountNumberList.map((account) => account);
    } else {
        console.log("No accounts data available.");
    }
});
</script>
