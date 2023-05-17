<script setup>
/*import { RouterLink, RouterView } from 'vue-router'*/

import { RouterLink, RouterView } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/coppel.png" alt="Coppel" width="120">
        Pólizas de faltantes
      </router-link>
      <div v-show="authStore.user">
        <router-link class="btn btn-sm btn-outline-primary me-2" to="/">Home</router-link>
        <router-link class="btn btn-sm btn-outline-primary me-2" to="/poliza/create">Crear</router-link>
        <router-link class="btn btn-sm btn-outline-primary me-2" to="/polizas">Polizas</router-link>
      </div>
      <div>
        <router-link class="btn btn-sm btn-outline-primary me-2" to="/login">Token</router-link>
        <a @click="authStore.logout()" class="btn btn-sm btn-outline-primary me-2">Logout</a>
      </div>

    </div>
  </nav>

  <div class="row justify-content-center">
    <RouterView />
  </div>
</template>
