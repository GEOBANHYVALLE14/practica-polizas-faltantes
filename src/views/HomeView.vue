<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from "@/stores/auth.js";
import { useUsersStore } from "@/stores/users.js";

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);


//usersStore.getAll();

</script>

<template>
  <main>
    <div class="container py-4">
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">¡Bienvenido!</h1>
          <p class="col-md-12 fs-4">Ya obtuviste tú token de autenticación</p>
          <!--{{ authUser?.data.token }} -->
          <router-link :to="'/polizas'"><button class="btn btn-primary btn-lg">Pólizas de faltantes</button></router-link>
        </div>
      </div>
    </div>
    <ul v-if="users.length">
            <li v-for="user in users" :key="user.id">{{user.id}} {{user.empleadoGenero}}</li>
        </ul>
  </main>
</template>