<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import InputFecha from './InputFecha.vue';
import InputMonto from './InputMonto.vue';
import moment from 'moment';
import "moment/dist/locale/es";
import SelectCategorias from './SelectCategorias.vue';

const date = moment()
const fecha = ref<string>(date.format("YYYY-MM-DD"))

const categoria = ref<string>("")
const monto = ref<string>("")
const tipo = ref<"gasto" | "ingreso">("gasto")

const catReq = computed(() => !(tipo.value === "gasto"))


interface dataTemplate { gasto: any[], ingreso: any[] }

const DATA_TEMPLATE: dataTemplate = { gasto: [], ingreso: [] }

const submit = () => {
    const data = window.localStorage.getItem("data") ?? null
    const indexDate = `${fecha.value}T${moment().format("hh:mm:ss")}`

    const value = [indexDate, monto.value, tipo.value, categoria.value]

    if (data === null) {
        DATA_TEMPLATE[tipo.value].push(value)
        window.localStorage.setItem("data", JSON.stringify(DATA_TEMPLATE))

    } else {
        const parsedData: dataTemplate = JSON.parse(data)
        parsedData[tipo.value].push(value)
        window.localStorage.setItem("data", JSON.stringify(parsedData))
    }

    nextTick(() => {
        categoria.value = ""
        monto.value = ""
        tipo.value = "gasto"
    })//sincroniza los valores
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
    <form @submit.prevent="submit" class="flex flex-col gap-4 mb-4">
        <InputFecha v-model="fecha" />
        <SelectCategorias v-model="categoria" :req="catReq" />
        <InputMonto v-model="monto" />
        <label class="flex cursor-pointer gap-2">
            <span><i class="bi bi-arrow-down text-error"></i> Gasto</span>
            <input v-model="tipo" true-value="ingreso" false-value="gasto" type="checkbox"
                class="toggle toggle-primary" />
            <span><i class="bi bi-arrow-up text-success"></i> Ingreso</span>
        </label>
        <p class="text-xs font-thin">
            <i class="bi bi-info-circle"></i> El gasto o ingreso se añadirá con la fecha seleccionada ({{
                moment(fecha).format("LL")
            }}).
        </p>
        <button type="submit" class="btn btn-primary"><i class="bi bi-plus text-2xl"></i></button>
    </form>
</template>