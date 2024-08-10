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
      <!-- v-click-outside="closeDropdown" -->
      <div
        class="flex mx-2 hover:bg-slate-200 p-1 rounded-md flex-row"
       
      >
        <button
          id="dropdownDefaultButton"
          @click="toggleDropdown"
          class="mx-4 flex items-center"
        >
          123-456-789
          <Iconify :icon="ArrowDown" class="text-BLACKTEXT h-full ml-2" />
        </button>
        <div
          v-if="isDropdownOpen"
          id="dropdown"
          class="z-10 bg-gray-50 divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-12"
        >
          <ul
            class="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-slate-200 dark:hover:text-BLACKTEXT rounded-md"
                >Create Account</a
              >
            </li>
          </ul>
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
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const ProfileIcon = "iconamoon:profile";
const BellIcon = "mingcute:notification-line";
const ArrowDown = "iconamoon:arrow-down-2-duotone";

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

const isDropdownOpen = ref(false);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdown() {
  isDropdownOpen.value = false;
}

// function handleClickOutside(event) {
//   // Check if the click was outside the dropdown
//   if (
//     !event.target.closest("#dropdown") &&
//     !event.target.closest("#dropdownDefaultButton")
//   ) {
//     closeDropdown();
//   }
// }

// onMounted(() => {
//   document.addEventListener("click", handleClickOutside);
// });

// onUnmounted(() => {
//   document.removeEventListener("click", handleClickOutside);
// });
</script>
