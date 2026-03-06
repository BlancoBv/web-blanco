<script setup lang="ts">
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';

const isMounted = ref<boolean>(false)
const gastos = ref<[string, number][]>([])
const ingresos = ref<[string, number][]>([])

const lista = computed<[string, number, string, number][]>(() => {
    return [...gastos.value.map((el, index) => [...el, "gasto", index]), ...ingresos.value.map((el, index) => [...el, "ingreso", index])] as [string, number, string, number][]
})
const date = moment()

const deleteElement = (tipo: string, index: number) => {
    const data = localStorage.getItem("data")
    if (data !== null) {
        const newData = JSON.parse(data)

        newData[tipo] = newData[tipo].toSpliced(index, 1)

        localStorage.setItem("data", JSON.stringify(newData))

        if (tipo === "gasto") {
            gastos.value = newData[tipo]
        } else {
            ingresos.value = newData[tipo]
        }

        return
    }
}

onMounted(() => {
    const data = localStorage.getItem("data")
    if (data !== null) {
        gastos.value = JSON.parse(data).gasto.filter(
            (el: [string, number]) =>
                moment(el[0].split("T")[0]).format("YYYY-MM") ===
                date.format("YYYY-MM"),
        );
        ingresos.value = JSON.parse(data).ingreso.filter(
            (el: [string, number]) =>
                moment(el[0].split("T")[0]).format("YYYY-MM") ===
                date.format("YYYY-MM"),
        );
    }
    isMounted.value = true
})

</script>
<template>
    <template v-if="!(isMounted)">
        <div class="w-full h-96 skeleton"></div>
    </template>
    <template v-else>
        <ul class="list bg-base-100 rounded-box shadow-md">

            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Todos los registros del mes actual</li>

            <li class="list-row" v-for="(value, index) in lista">
                <div class="text-4xl font-thin opacity-30 tabular-nums">{{ index + 1 }}</div>
                <div>
                    <template v-if="value[2] === 'gasto'">
                        <i class="bi bi-arrow-up text-2xl text-error"></i>
                    </template>
                    <template v-else>
                        <i class="bi bi-arrow-down text-2xl text-success"></i>
                    </template>

                </div>
                <div class="list-col-grow">
                    <div>${{ value[1] }}</div>
                    <div class="text-xs uppercase font-semibold opacity-60"> {{
                        value[0].toString().split("T")[0] }}</div>
                </div>
                <button class="btn btn-square btn-ghost" @click="deleteElement(value[2], value[3])">
                    <i class="bi bi-trash"></i>
                </button>
            </li>



        </ul>
    </template>
</template>