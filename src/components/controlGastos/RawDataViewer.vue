<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Swal from "sweetalert2"
const isMounted = ref<boolean>(false)
const data = ref<string>("")

const copyToClipboard = () => {
    navigator.clipboard.writeText(data.value);
    Swal.fire({ text: "¡Copiado al portapapeles!", icon: "success", timer: 1000, showConfirmButton: false, timerProgressBar: true })
}

onMounted(() => {
    isMounted.value = true
    data.value = localStorage.getItem("data") ?? "Sin datos."
})

</script>

<template>
    <div v-if="!(isMounted)" class="skeleton w-full h-28"></div>

    <div v-else class="indicator w-full h-28">
        <button class="indicator-item btn btn-secondary btn-outline translate-0 m-1" @click="copyToClipboard"
            :disabled="data === 'Sin datos.'">
            <i class="bi bi-clipboard"></i>
        </button>
        <div class="mockup-code w-full">
            <pre>
            <code>{{ data }}</code>
        </pre>
        </div>
    </div>

    <!--     <div class="mockup-code">
        <pre>
            <code>{{ data }}</code>
        </pre>
    </div> -->
</template>