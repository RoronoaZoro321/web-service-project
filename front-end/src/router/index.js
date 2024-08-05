import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Balance from '../views/Balance.vue'
import HonrizontalNav from '../app-layouts/NavHonrizontal.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: {requiresAuth: true},
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/balance',
    name: 'Balance',
    component: Balance,
  },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  const auth = {
    isLoggedIn() {
      // Simulate an auth check (replace with real authentication logic)

      return !!localStorage.getItem('user');
    }
  };
  
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !auth.isLoggedIn()) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath },
//     });
//   } else {
//     if (to.meta.title) {
//       document.title = to.meta.title;
//     }
//     next();
//   }
// });
  
export default router;
