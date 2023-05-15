<script setup>
import { ref, computed } from "vue";

import { RouterLink } from 'vue-router';
import { useGetDataPolizas } from '@/composables/getDataPolizas';
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let errors = ref("");


const { data, empleados, articulos, responseCoppel, loading, getDataEmpleados, getDataArticulos, updatePoliza, getDataPoliza, setPoliza, notify, error,  idEmpleado, sku, cantidad, idPoliza } = useGetDataPolizas();
getDataEmpleados('http://localhost:8085/api/empleados/', localStorage.getItem("token"));
getDataArticulos('http://localhost:8085/api/articulos/', localStorage.getItem("token"));

getDataPoliza(`http://localhost:8085/api/polizas/${route.params.id}` , localStorage.getItem("token"))


const handleSubmit = () => {
        let body = {};
        errors.value = 0;
        responseCoppel.value = null;
        if (idEmpleado.value <= 0 ||  idEmpleado.value == '') {
            errors.value++;
            console.log("empleadoGenero error")
        }  
        if (sku.value <= 0 ||  sku.value == '') {
            errors.value++;
            console.log("sku error")
        } 
        if (cantidad.value == 0 ||  cantidad.value == '') {
            errors.value++;
            console.log("cantidad error")
        } 
   
        if(errors.value == 0){
            body.idPoliza = idPoliza.value;
            body.empleadoGenero = idEmpleado.value;
            body.sku = sku.value;
            body.cantidad = cantidad.value;
            updatePoliza('http://localhost:8085/api/polizas/', localStorage.getItem("token"), body);
        } else {
            notify("Datos no validos");
        }
    };

    const orderedEmpleados = computed(() => {
    return empleados.value.sort(function (a, b) {
        if (a.idEmpleado > b.idEmpleado) {
            return 1;
        }
        if (a.idEmpleado < b.idEmpleado) {
            return -1;
        }
        // a must be equal to b
        return 0;
    })

});
</script> 

<template>
    <div class="col-sm-6 mt-2">
        <div class="card card-container bg-light rounded-3">
            <div class="card-body">
           
                <h1>Actualizar Póliza</h1>
                <div class="alert alert-danger" v-if="error">{{ error }}</div>
                <h5 v-if="loading" class="card-title">
                    Espere...
                </h5>
                
                <form @submit.prevent="handleSubmit">
                    <p v-if="errors">
                        <b>Por favor, corrija el(los) dato(s)</b>
                    </p>
                    <input type="hidden" id="idPoliza" name="idPoliza" class="form-control" v-model = "idPoliza"/>
                    <div class="m-3">
                        <label for="idEmpleado" class="form-label">Empleado: {{ idEmpleado }}</label>
                        <select id="idEmpleado" name="idEmpleado" class="form-control" v-model = "idEmpleado">
                            <option disabled value="">Selecciona un empleado</option>
                            <option v-for="item in orderedEmpleados" :value="item.idEmpleado" :key="item.idEmpleado"> {{item.nombre}} {{item.apellido}}</option>
                        </select>
                    </div>
                    <div class="m-3">
                        <label for="sku" class="form-label">Artículo: {{ sku }}</label>
                        <select id="sku" name="sku" class="form-control" v-model = "sku" disabled="">
                            <option disabled value="">Selecciona un artículo</option>
                            <option v-for="item in articulos" :value="item.id" :key="item.id"> {{item.nombre}}</option>
                        </select>
                    </div>
                    <div class="m-3">
                        <label for="cantidad" class="form-label">Cantidad: {{ cantidad }}</label>
                        <input type="number" id="cantidad" name="cantidad" class="form-control" v-model = "cantidad" disabled=""/>
                    </div>
                    <div class="m-3"><hr class="my-4"></div>
                    <div class="m-3">
                        <button class = "btn btn-success form-control" type="submit" >
                            Actualizar Póliza
                        </button>
                    </div>
                </Form >
            </div>
        </div>
    </div>
</template>