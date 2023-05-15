<script setup>
import { ref, computed } from "vue";

import { RouterLink } from 'vue-router';
import { useGetDataPolizas } from '@/composables/getDataPolizas';
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const { data, loading, getDataPoliza, error } = useGetDataPolizas();

getDataPoliza(`http://localhost:8085/api/polizas/${route.params.id}`, localStorage.getItem("token"));

</script> 

<template>
    <div class="col-sm-6 mt-2">
        <div v-if="data">
            <div class="card card-container rounded-3 mt-4 ">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-10">

                            <h2>Detalles de la Póliza: {{ data.data.poliza.idPoliza }}</h2>
                        </div>
                        <div class="col-md-2">
                            <router-link :to="`/poliza/${data.data.poliza.idPoliza}`"><button
                                    class="btn btn-sm btn-primary"><font-awesome-icon
                                        :icon="['fas', 'pencil-alt']" />Editar</button></router-link>
                        </div>
                    </div>

                </div>
                <div class="card-body">

                    <div class="alert alert-danger" v-if="error">{{ error }}</div>
                    <h5 v-if="loading" class="card-title">
                        Espere...
                    </h5>

                    <h5>Empleado: {{ data.data.empleado.id }} {{ data.data.empleado.nombre }} {{ data.data.empleado.apellido
                    }}
                    </h5>
                    <h5>Cantidad: {{ data.data.poliza.cantidad }} </h5>
                    <h5>Artículo: {{ data.data.detalleArticulo.sku }} {{ data.data.detalleArticulo.nombre }}</h5>
                </div>
            </div>
        </div>
        <h1 v-else>Oh no 😢... no existe la póliza</h1>
    </div>
</template>