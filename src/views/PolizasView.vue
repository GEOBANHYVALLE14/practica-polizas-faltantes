<script setup>
//import axios from 'axios'
import { ref, computed } from "vue";
import { RouterLink } from 'vue-router';
import { useGetDataPolizas } from '@/composables/getDataPolizas';

const { data, loading, getDataPolizas, deletePoliza, error } = useGetDataPolizas();

getDataPolizas('http://localhost:8085/api/polizas/', localStorage.getItem("token"))

const orderedPolizas = computed(() => {
    return data.value.sort(function (a, b) {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }
        // a must be equal to b
        return 0;
    })

});

const handleClickEliminar = (id) => {
    console.log("eliminar: " + id);

    var indice = data.value.indexOf(id);
    if (indice != -1) {
        data.value.splice(indice, 1);
    }

    deletePoliza('http://localhost:8085/api/polizas/' + id, localStorage.getItem("token"));
};

</script>


<template>
    <div class="col-sm-10 mt-2">
        <h1>Pólizas</h1>
        <p v-if="loading">Cargando información...</p>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
        <div v-if="data">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>EMPLEADO</th>
                        <th>SKU</th>
                        <th>CANTIDAD</th>
                        <th>FECHA</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="poliza in orderedPolizas" :key="poliza.id">
                        <td>
                            <router-link :to="`/poliza/view/${poliza.id}`"><button
                                    class="btn btn-sm btn-primary"><font-awesome-icon :icon="['fas', 'eye']" /> {{ poliza.id
                                    }}</button></router-link>
                        </td>
                        <td>{{ poliza.empleadoGenero }}</td>
                        <td>{{ poliza.sku }}</td>
                        <td>{{ poliza.cantidad }}</td>
                        <td>{{ poliza.fecha }}</td>
                        <td>
                            <button v-on:click="handleClickEliminar(poliza.id)"
                                class="btn btn-sm btn-danger m-1"><font-awesome-icon
                                    :icon="['fas', 'trash-alt']" /></button>
                            <router-link :to="`/poliza/${poliza.id}`"><button
                                    class="btn btn-sm btn-primary"><font-awesome-icon
                                        :icon="['fas', 'pencil-alt']" /></button></router-link>
                        </td>
                    </tr>
                </tbody>
        </table>
    </div>
    <h1 v-else>Oh no 😢... no hay pólizas</h1>
</div></template>
