<template>
    <div class="spinner" v-if="loading">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
</template>

<script>
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent({
    name: "Spinner",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { loading } = toRefs(props);
        return { loading };
    },
});
</script>

<style scoped>
.spinner {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 100px auto;
}

.double-bounce1,
.double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: bounce 2s infinite ease-in-out;
    animation: bounce 2s infinite ease-in-out;
}

.double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
}

@-webkit-keyframes bounce {
    0%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    50% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes bounce {
    0%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    50% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>
