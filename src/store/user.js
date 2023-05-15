import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";
import { useGetDataPolizas } from "@/composables/getDataPolizas";
const { notify } = useGetDataPolizas();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: "",
    loadingUser: false,
    jwt: "",
  }),
  actions: {
    async loginUser(username, password) {
      this.loadingUser = true;

      let url = "http://127.0.0.1:8085/login";

      try {
        const userData = {};
        userData.username = username;
        userData.password = password;

        const { data } = await axios.post(url, userData);

        this.jwt = data.data.token;
        localStorage.setItem("token", this.jwt);
        if (this.jwt.length > 0) {
          notify("¡Se obtuvo token correctamente!", "info");
        }
        console.log("token = " + this.jwt);

        router.push("/");
      } catch (error) {
        //console.log(error);
        notify("Error al obtener token", "error");
        this.jwt = "";
        localStorage.removeItem("token");
      } finally {
        this.loadingUser = false;
      }
    },
  },
});
