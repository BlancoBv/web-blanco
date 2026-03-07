<script setup lang="ts">
import categorias from 'src/utils/categorias';

const props = defineProps<{ req: boolean }>()

const model = defineModel<string>()



</script>
<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Categoría del gasto</legend>
        <select v-model="model" class="select select-lg w-full appearance-none validator" required
            :disabled="props.req">
            <option disabled selected value="">Selecciona una categoría</option>
            <option v-for="value in categorias" :value="value.id">{{ value.nombre }}</option>
        </select>
    </fieldset>
</template>