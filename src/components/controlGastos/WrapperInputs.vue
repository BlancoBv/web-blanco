<script setup lang="ts">
import { ref } from 'vue';
import InputFecha from './InputFecha.vue';
import InputMonto from './InputMonto.vue';
import moment from 'moment';

const date = moment()
const fecha = ref<string>(date.format("YYYY-MM-DD"))

</script>
<template>
    <div class="flex flex-col gap-4 mb-4">
        <InputFecha v-model="fecha" />
        <InputMonto label="gasto" :fecha="fecha" />
        <InputMonto label="ingreso" :fecha="fecha" />
    </div>
</template>