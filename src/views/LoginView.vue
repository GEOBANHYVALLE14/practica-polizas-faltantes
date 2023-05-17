<script setup>
/*
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
import { useGetDataPolizas } from '@/composables/getDataPolizas';

//import { useRoute } from "vue-router";
let errors = ref(0);
const userStore = useUserStore();
//const router = useRoute();
const { loadingUser, jwt } = storeToRefs(userStore); // solo para los getters o datos reactivos
const { notify } = useGetDataPolizas();

const username = ref("");
const password = ref("");

const handleSubmit = () => {
    errors.value = 0;

    if (username.value.length == 0 || username.value == '') {
        // errors.empleadoGenero = "empleadoGenero error";
        errors.value++;
        console.log("username error")
    }

    if (password.value.length == 0 || password.value == '') {
        // errors.empleadoGenero = "empleadoGenero error";
        errors.value++;
        console.log("password error")
    }

    if (errors.value == 0) {
        userStore.loginUser(username.value, password.value);
    } else {
        jwt.value = "";
        localStorage.removeItem("token");
        notify("Datos no válidos", "warn");
    }

};
*/

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from "@/stores/auth";

const schema = Yup.object().shape({
    username: Yup.string().required('Username es obligatorio'),
    password: Yup.string().required('Password  es obligatorio')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
        .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
    <!--<div class="col-md-5 mt-2">
        <div class="card card-container bg-light rounded-3">
            <div class="card-body">
                <h5 v-if="loadingUser" class="card-title">
                    Espere...
                </h5>
                <h1>Tokens</h1>

                <form @submit.prevent="handleSubmit">
                    <div class="m-3 ">
                        <label for="username" class="form-label">Username</label>
                        <input name="username" class="form-control" type="username" placeholder="Username"
                            v-model.trim="username" />
                    </div>

                    <div class="m-3">
                        <label for="password" class="form-label">Password</label>
                        <input name="password" class="form-control" type="password" placeholder="password"
                            v-model.trim="password" />
                    </div>
                    <div class="m-3">
                        <hr class="my-4">
                    </div>
                    <div class="m-3">
                        <button class="btn btn-primary form-control" type="submit" :disabled="userStore.loadingUser">
                            Obtener Token
                        </button>
                    </div>
                </form>
                <p v-if="jwt.length > 0" class="card-text">{{ jwt }}
                </p>
            </div>
        </div>
    </div>-->



    <div class="col-md-5 mt-2">
        <div class="card card-container bg-light rounded-3">
            <div class="card-body">

                <h1>Login</h1>
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                    <div class="form-group m-3">
                        <label for="username" class="form-label">Username</label>
                        <Field name="username" type="text" class="form-control"
                            :class="{ 'is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{ errors.username }}</div>
                    </div>
                    <div class="form-group m-3">
                        <label for="password" class="form-label">Password</label>
                        <Field name="password" type="password" class="form-control"
                            :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                    </div>
                    <div class="m-3">
                        <hr class="my-4">
                    </div>
                    <div class="form-group m-3">
                        <button class="btn btn-primary form-control" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                            Obtener Token
                        </button>
                    </div>
                    <div v-if="errors.apiError" class="alert alert-danger m-3">{{ errors.apiError }}</div>
                </Form>
            </div>
        </div>
    </div>
</template>
 