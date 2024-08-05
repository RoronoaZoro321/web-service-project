<template>
    <div class="flex justify-between pt-4 pr-8">
        <div class="flex items-center">
            <Iconify :icon="Profile" class="mr-2"/>
            <span>123-456-789</span>
        </div>
        <button class="bg-blue text-white border-none pt-2 pr-4 cursor-pointer">Logout</button>
    </div>
    <!-- <slot></slot> -->
</template>


<script setup>
import { Icon as Iconify } from "@iconify/vue"
const ProfileIcon = "iconamoon:profile-circle-fill"
</script>