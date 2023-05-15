<script setup>
import { ref, computed } from "vue";
import { RouterLink } from 'vue-router';
import { useGetDataPolizas } from '@/composables/getDataPolizas';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

let empleadoGenero = ref("");
let sku = ref("");
let cantidad = ref(0);
let errors = ref(0);



const { data, empleados, articulos, responseCoppel, loading, getDataEmpleados, getDataArticulos, setPoliza, notify, error } = useGetDataPolizas();
getDataEmpleados('http://localhost:8085/api/empleados/', localStorage.getItem("token"));
getDataArticulos('http://localhost:8085/api/articulos/', localStorage.getItem("token"));

const handleSubmit = () => {
    let body = {};
    errors.value = 0;
    responseCoppel.value = null;
    if (empleadoGenero.value <= 0 || empleadoGenero.value == '') {
        // errors.empleadoGenero = "empleadoGenero error";
        errors.value++;
        console.log("empleadoGenero error")
    }
    if (sku.value <= 0 || sku.value == '') {
        errors.value++;
        console.log("sku error")
    }
    if (cantidad.value == 0 || cantidad.value == '') {
        errors.value++;
        console.log("cantidad error")
    }

    if (errors.value == 0) {
        body.empleadoGenero = empleadoGenero.value;
        body.sku = sku.value;
        body.cantidad = cantidad.value;
        setPoliza('http://localhost:8085/api/polizas', localStorage.getItem("token"), body);
    } else {
        notify("Datos no válidos", "warn");
    }
};

const orderedArticulos = computed(() => {
    return articulos.value.sort(function (a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        // a must be equal to b
        return 0;
    })

});

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

                <h1>Crear Póliza</h1>
                <div class="alert alert-danger" v-if="error">{{ error }}</div>
                <h5 v-if="loading" class="card-title">
                    Espere...
                </h5>

                <form @submit.prevent="handleSubmit">
                    <p v-if="errors">
                        <b>Por favor, corrija el(los) dato(s)</b>
                    </p>

                    <div v-if="orderedEmpleados" class="m-3">
                        <label for="empleadoGenero" class="form-label">Empleado: {{ empleadoGenero }}</label>
                        <select id="empleadoGenero" name="empleadoGenero" class="form-control" v-model="empleadoGenero">
                            <option disabled value="">Selecciona un empleado</option>
                            <option v-for="item in orderedEmpleados" :value="item.idEmpleado" :key="item.idEmpleado">
                                {{ item.nombre }} {{ item.apellido }}</option>
                        </select>
                    </div>
                    <div v-if="orderedArticulos" class="m-3">
                        <label for="sku" class="form-label">Artículo: {{ sku }}</label>
                        <select id="sku" name="sku" class="form-control" v-model="sku">
                            <option disabled value="">Selecciona un artículo</option>
                            <option v-for="item in orderedArticulos" :value="item.id" :key="item.id"> {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="m-3">
                        <label for="cantidad" class="form-label">Cantidad: {{ cantidad }}</label>
                        <input type="number" id="cantidad" name="cantidad" class="form-control" v-model="cantidad" />
                    </div>
                    <div class="m-3">
                        <hr class="my-4">
                    </div>
                    <div class="m-3">
                        <button class="btn btn-success form-control" type="submit">
                            Grabar Póliza
                        </button>
                    </div>
                </Form>


            </div>
        </div>
    </div>
</template>
 