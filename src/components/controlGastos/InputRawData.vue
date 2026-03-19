<script setup lang="ts">
import Swal from 'sweetalert2';
import { ref } from 'vue';


const value = ref<string>("")

const submit = () => {
    localStorage.setItem("data", value.value)
    Swal.fire({ text: "¡Importado correctamente!", icon: "success", timer: 1000, showConfirmButton: false, timerProgressBar: true })
}



</script>
<template>
    <form @submit.prevent="submit">
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Importar datos</legend>
            <textarea v-model="value" class="textarea" placeholder="Ingresa los datos" required></textarea>
        </fieldset>
        <button type="submit" class="btn btn-secondary">Importar</button>
    </form>
</template>