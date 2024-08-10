import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("account", () => {
    const currentAccount = ref(null);
    const accountNumberList = ref(null);
    const name = ref(null);
    const balance = ref(0);

    return { currentAccount, accountNumberList, name, balance };
});
