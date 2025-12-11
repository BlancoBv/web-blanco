<script setup lang="ts">
import { ref, } from 'vue';
const modelo = ref<string>("")
const precio = ref<string>("")
const ram = ref<string>("")
const almacenamiento = ref<string>("")
const img = ref<string>("")

</script>
<template>
    <div class="grid grid-cols-1 gap-4 mb-4">
        <input v-model="img" type="text" placeholder="img" class="input input-bordered w-full max-w-xs" />
        <input v-model="modelo" type="text" placeholder="modelo" class="input input-bordered w-full max-w-xs" />
        <input v-model="almacenamiento" type="text" placeholder="almacenamiento"
            class="input input-bordered w-full max-w-xs" />
        <input v-model="ram" type="text" placeholder="ram" class="input input-bordered w-full max-w-xs" />

    </div>


    <div class="card bg-base-100 w-96 border">
        <figure>
            <img class="size-60 object-contain" :src="img" alt="modelo-tel" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                {{ modelo.toUpperCase() }}
                <div class="badge badge-primary">NUEVO</div>
            </h2>
            <div class="card-actions justify-start">
                <div class="badge badge-outline gap-2"><i class="bi bi-hdd-fill"></i> {{
                    almacenamiento }} GB</div>
                <div class="badge badge-outline gap-2"><i class="bi bi-cpu-fill"></i> {{
                    ram }} GB</div>

            </div>
            <p class=" text-balance">¡Aprovecha nuestras ofertas! En el módulo Telcel encontrarás los
                mejores precios y las mejores marcas. <!-- Además, en tu recarga de $100 te damos el doble de gigas. -->
            </p>
            <div class="flex justify-between items-end">
                <img class="" src="/img/telcel-logo.webp" width="100px" />
                <div class="flex flex-col gap-4 justify-end items-end">
                    <div class=" font-thin text-sm">Disponible en:</div>
                    <img src="/img/coppel/coppel-logo.webp" width="100px" />
                </div>

            </div>
        </div>

    </div>
</template>