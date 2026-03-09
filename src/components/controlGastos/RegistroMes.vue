<script setup lang="ts">
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
import categorias from 'src/utils/categorias';

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

const formatMoney = (value: number) => {
    const f = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    })
    return f.format(value)
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
                <div class="text-4xl">
                    <template v-if="value[2] === 'gasto'">
                        <i class="bi bi-arrow-up text-error"></i>
                    </template>
                    <template v-else>
                        <i class="bi bi-arrow-down text-success"></i>
                    </template>

                </div>
                <div class="list-col-grow">
                    <div class="flex gap-2 items-center">
                        <i class="bi bi-cash text-lg"></i>
                        <span>{{ formatMoney(value[1]) }}</span>
                    </div>
                    <div class="text-xs uppercase font-semibold grid grid-cols-1 grid-rows-2 gap-1">
                        <div class="badge badge-soft badge-primary text-xs">
                            <i class="bi bi-calendar"></i>
                            <span>{{ value[0].toString().split("T")[0] }}</span>
                        </div>
                        <div v-if="value[2] === 'gasto'" class="badge badge-soft badge-secondary text-xs">
                            <i class="bi bi-question-lg"></i>
                            <span>
                                {{ categorias[value[3] as keyof typeof categorias]?.nombre ??
                                    "Indefinido"
                                }}
                            </span>
                        </div>
                    </div>
                </div>
                <button class="btn btn-square btn-ghost" @click="deleteElement(value[2], value.at(-1) as number)">
                    <i class="bi bi-trash"></i>
                </button>
            </li>



        </ul>
    </template>
</template>