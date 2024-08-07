<template>
    <div class="flex justify-between py-4 px-4 bg-gray-100 shadow-md">
        <div class="flex flex-row p-1">
            <div class="bg-slate-200 w-8 h-8 rounded-md" ><Iconify :icon="ProfileIcon" class="bg-slate-200 w-8 h-4     flex justify-center rounded-xl" /></div>
            <span class="mx-4">123-456-789</span>
        </div>
        <button class="bg-blue-500 text-white text-sm rounded-md border-none p-2 cursor-pointer">Logout</button>
    </div>
</template>


<script setup>
import { Icon as Iconify } from "@iconify/vue"
const ProfileIcon = "iconamoon:profile"
</script>