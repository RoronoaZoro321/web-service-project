<template>
    <Vueform
        size="md"
        :display-errors="false"
        add-class="vf-create-account"
        ref="form$"
        :endpoint="false"
        @submit="submit"
    >
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
        <!-- <div class="w-full flex justify-center">
            <Iconify :icon="ArrowDown" class="" />
        </div>
        <div
            class="bg-gray-100 text-BLACKTEXT col-span-12 h-12 rounded-md justify-center flex items-center font-semibold"
        >
            <span>฿ 1,000</span>
        </div> -->
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
            :disabled="isSubmit"
            button-label="Next"
            :submits="true"
            :full="true"
            size="md"
            :columns="{
                container: 3,
            }"
        />
    </Vueform>

    <TopupSuccess v-if="isSuccess" />
    <TopupFail v-if="isFail" />
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import TopupSuccess from "./TopupSuccess.vue";
import TopupFail from "./TopupFail.vue";
import { onMounted, ref } from "vue";
const ArrowDown = "charm:arrow-down";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useStore } from "../store/store";
import axios from "axios";

const form$ = ref(null);
const isSubmit = ref(false);
const isSuccess = ref(false);
const isFail = ref(false);
const router = useRouter();
const route = useRoute();
const store = useStore();

const getFormData = () => {
    return {
        accountNumber: store.currentAccount,
        code: form$.value.el$("ID number").value,
    };
};

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

const submit = async () => {
    isSubmit.value = true;

    const formData = getFormData();

    try {
        const response = await axios.patch(
            "http://127.0.0.1:3000/api/v1/esb/topup",
            formData,
            { withCredentials: true }
        );

        const data = await response.data;

        isSuccess.value = true;

        setTimeout(() => {
            isSuccess.value = false;
            router.push("/balance");
        }, 3000);
    } catch (error) {
        isFail.value = true;

        setTimeout(() => {
            isFail.value = false;
            router.push("/balance");
        }, 3000);
    } finally {
        isSubmit.value = false;
    }
};

onMounted(() => {
    if (!store.currentAccount) {
        router.push("/balance");
    }
});
</script>
