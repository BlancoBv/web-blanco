<script setup lang="ts">
const model = defineModel<string>()

</script>
<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Monto</legend>
        <input v-model.number="model" type="number" step="0.01" min="1" required placeholder="0.00"
            class="input input-lg w-full" />
    </fieldset>
</template>