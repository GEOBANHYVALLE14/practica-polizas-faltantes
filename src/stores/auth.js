import { defineStore } from "pinia";

import router from "../router";
import { fetchWrapper } from "@/helpers/fetch-wrapper.js";
import { useGetDataPolizas } from "@/composables/getDataPolizas";
const { notify } = useGetDataPolizas();
const baseUrl = `${import.meta.env.VITE_API_URL}/login`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // inicializa el estado desde el almacenamiento local para permitir que el usuario permanezca conectado
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      console.log("login metodo");

      const user = await fetchWrapper.post(baseUrl, {
        username,
        password,
      });

      // actualiza el estado de pinia
      this.user = user;

      // almacena jwt en el almacenamiento local para mantener al usuario conectado entre actualizaciones de página
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.data.token);
      if (this.user.data.token) {
        notify("¡Se obtuvo token correctamente!", "info");
      } 
      
      console.log(this.user.data.token);

      // redirigir a la url anterior o por defecto a la página de inicio
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});
