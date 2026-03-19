<script setup lang="ts">
import { ref } from 'vue';


const value = ref<string>("")

const submit = () => {
    localStorage.setItem("data", value.value)
}



</script>
<template>
    <form @submit.prevent="submit">
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Importar datos</legend>
            <textarea v-model="value" class="textarea" placeholder="Ingresa los datos" required></textarea>
        </fieldset>
        <button type="submit" class="btn btn-primary">Importar</button>
    </form>
</template>