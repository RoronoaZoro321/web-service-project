<template>
    <div>
        <h3 class="text-l font-semibold text-gray-800 mb-8">
            Transfer Money To
        </h3>
        <div class="flex justify-center">
            <div class="grid justify-items-center">
                <img
                    src="../assets/profile.png"
                    alt="profile"
                    class="rounded-full w-16 mb-4"
                />
                <div class="mb-8">
                    <h3>John Doe</h3>
                    <h3 class="text-xs text-gray-400">123-456-***</h3>
                </div>
                <span class="font-semibold text-xl"> ฿ 10,000</span>
            </div>
        </div>
        <div
            class="mx-auto my-12 border-solid border flex w-full justify-between border-slate-200 p-2 rounded-lg"
        >
            <p class="text-sm text-gray-400">Your Account</p>
            <span class="ml-6 text-sm">987-654-321</span>
        </div>
        <Vueform
            size="md"
            :display-errors="false"
            add-class="vf-create-account"
        >
            <ButtonElement
                name="reset"
                button-label="Back"
                @click="goto({ path: '/transfer' })"
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
    </div>
</template>
<script setup>
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
