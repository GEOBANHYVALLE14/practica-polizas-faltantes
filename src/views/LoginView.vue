<script setup>
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

</script>

<template>
    <div class="col-md-5 mt-2">
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
    </div>
</template>
 