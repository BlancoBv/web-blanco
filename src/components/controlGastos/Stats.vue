<script setup lang="ts">
import { gastoIngresoMes } from "src/utils/calcular";
import { computed, onMounted, reactive } from "vue";
import moment from "moment";

type internalData = [string, number, string, number | string];
//fecha, monto, tipo, id de categoria de gasto

interface data {
    gastos: number;
    ingresos: number;
    gastosAnterior: number;
    ingresosAnterior: number;
}

const data = reactive<data>({ gastos: 0, ingresos: 0, gastosAnterior: 0, ingresosAnterior: 0 })

const plantilla = computed(() => {
    const format = new Intl.NumberFormat("es-MX", { currency: "MXN", style: "currency" })
    let difGasto = 0
    let difIngreso = 0

    if (data.gastosAnterior > 1) {
        difGasto = Math.round(((data.gastos - data.gastosAnterior) / data.gastosAnterior) * 100)
    }

    if (data.ingresosAnterior > 1) {
        difIngreso = Math.round(((data.ingresos - data.ingresosAnterior) / data.ingresosAnterior) * 100)
    }

    return { gasto: format.format(data.gastos), ingreso: format.format(data.ingresos), difGasto, difIngreso }


})


onMounted(() => {
    const mesAnterior = moment().subtract(1, "months")
    const { gastos, ingresos } = gastoIngresoMes()
    const datosMesAnterior = gastoIngresoMes(mesAnterior.format("YYYY-MM"))

    console.log(datosMesAnterior)

    data.gastos = gastos
    data.ingresos = ingresos
    data.ingresosAnterior = datosMesAnterior.ingresos
    data.gastosAnterior = datosMesAnterior.gastos
})

</script>
<template>
    <div class="stats stats-vertical w-full">
        <div class="stat">
            <div class="stat-figure text-success">
                <i class="bi bi-caret-up text-4xl"></i>
            </div>
            <div class="stat-title">Ingresos del mes</div>
            <div class="stat-value text-success">{{ plantilla.ingreso }} </div>
            <div class="stat-desc">{{ plantilla.difIngreso }}% respecto del
                mes anterior</div>
        </div>

        <div class="stat">
            <div class="stat-figure text-error">
                <i class="bi bi-caret-down text-4xl"></i>
            </div>
            <div class="stat-title">Gastos del mes</div>
            <div class="stat-value text-error">{{ plantilla.gasto }}</div>
            <div class="stat-desc">{{ plantilla.difGasto }}% respecto del
                mes anterior</div>
        </div>

        <!--  <div class="stat">
            <div class="stat-figure text-secondary">
                <div class="avatar avatar-online">
                    <div class="w-16 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
                    </div>
                </div>
            </div>
            <div class="stat-value">86%</div>
            <div class="stat-title">Tasks done</div>
            <div class="stat-desc text-secondary">31 tasks remaining</div>
        </div> -->
    </div>
</template>
