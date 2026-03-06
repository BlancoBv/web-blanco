<script setup lang="ts">
import moment from "moment";
import { ref } from "vue"
const props = defineProps<{ label: "gasto" | "ingreso", fecha: string }>()
const value = ref<string>("")

interface dataTemplate { gasto: any[], ingreso: any[] }

const DATA_TEMPLATE: dataTemplate = { gasto: [], ingreso: [] }

const submit = () => {
    const data = window.localStorage.getItem("data") ?? null
    const indexDate = `${props.fecha}T${moment().format("hh:mm:ss")}`

    if (data === null) {
        DATA_TEMPLATE[props.label].push([indexDate, value.value])
        window.localStorage.setItem("data", JSON.stringify(DATA_TEMPLATE))

    } else {
        const parsedData: dataTemplate = JSON.parse(data)
        parsedData[props.label].push([indexDate, value.value])
        window.localStorage.setItem("data", JSON.stringify(parsedData))
    }

    value.value = ""
    window.dispatchEvent(
        new CustomEvent("local-storage-changed", {
            detail: {
                storage: localStorage.getItem("data"),
            },
        }),
    );
}

</script>
<template>
    <form class="join w-full" @submit.prevent="submit">
        <label class="floating-label grow">
            <input v-model="value" type="number" step="0.01" min="1" required :placeholder="props.label.toUpperCase()"
                class="input input-lg validator" />
            <span>{{ props.label.toUpperCase() }}</span>
        </label>
        <button class="btn btn-primary btn-lg" type="submit"><i class="bi bi-plus"></i></button>
    </form>
</template>