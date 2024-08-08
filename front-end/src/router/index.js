import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Balance from "../views/Balance.vue";
import Transfer from "../views/Transfer.vue";
import HonrizontalNav from "../app-layouts/NavHonrizontal.vue";
import PIN from "../views/PINNeeded.vue";
import Checkout from "../views/Checkout.vue";
import Topup from "../views/TopUp.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // meta: {requiresAuth: true},
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/balance",
        name: "Balance",
        component: Balance,
        meta: {
            title: "",
            forceLayout: "horizontal",
        },
    },
    {
        path: "/transfer",
        name: "Transfer",
        component: Transfer,
    },
    {
        path: "/pin",
        name: "PIN",
        component: PIN,
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
    },
    {
        path: "/topup",
        name: "Topup",
        component: Topup,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

const auth = {
    isLoggedIn() {
        // Simulate an auth check (replace with real authentication logic)

        return !!localStorage.getItem("user");
    },
};

// Global navigation guard
router.beforeEach((to, from, next) => {
    // Set document title based on route meta
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    // Check authentication
    if (to.meta.requiresAuth && !auth.isLoggedIn()) {
        next({
            path: "/login",
            query: { redirect: to.fullPath },
        });
    } else {
        next();
    }
});

export default router;
