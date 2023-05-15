import axios from "axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import router from "../router";

export const useGetDataPolizas = () => {
  const data = ref(null);
  const empleados = ref([]);
  const articulos = ref([]);
  const error = ref(null);
  const responseCoppel = ref(null);
  const loading = ref(true);
  const idEmpleado = ref(null);
  const sku = ref(null);
  const cantidad = ref(null);
  const idPoliza = ref(null);

  const getDataPolizas = async (url, token) => {
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    loading.value = true;
    try {
      const resp = await axios.get(url, config);
      data.value = resp.data;

      console.log("getDataPolizas = " + JSON.stringify(resp.data));
    } catch (e) {
      console.log("Exception getDataPolizas: " + e);
      notify("Error al cargar las pólizas", "error");
      //error.value = "error de servidor";
    } finally {
      loading.value = false;
    }
  };

  const getDataEmpleados = async (url, token) => {
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    loading.value = true;
    try {
      const resp = await axios.get(url, config);
      empleados.value = resp.data;
      console.log("getDataEmpleados = " + JSON.stringify(resp.data));
    } catch (e) {
      console.log("Exception getDataEmpleados: " + e);
      notify("Error al cargar los empleados", "error");
      //error.value = "error de servidor";
    } finally {
      loading.value = false;
    }
  };

  const getDataArticulos = async (url, token) => {
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    loading.value = true;
    try {
      const resp = await axios.get(url, config);
      articulos.value = resp.data;
      console.log("getDataArticulos = " + JSON.stringify(resp.data));
    } catch (e) {
      console.log("Exception getDataArticulos: " + e);

      //error.value = "error de servidor";
      notify("Error al cargar los artículos", "error");
    } finally {
      loading.value = false;
    }
  };

  const setPoliza = async (url, token, body) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const bodyParameters = {
      empleadoGenero: body.empleadoGenero,
      sku: body.sku,
      cantidad: body.cantidad,
    };

    loading.value = true;
    try {
      responseCoppel.value = null;
      const resp = await axios.post(
        url,
        JSON.stringify(bodyParameters),
        config
      );
      responseCoppel.value = resp.data;

      console.log("setPoliza response = " + JSON.stringify(resp.data));

      if (resp.data.meta.status == "OK") {
        notify(
          "¡Póliza " + resp.data.data.poliza.idPoliza + " creada con éxito!",
          "success"
        );
        console.log(
          "setPoliza = ¡Póliza " +
            resp.data.data.poliza.idPoliza +
            " creada con éxito!"
        );
        router.push("/polizas");
      } else {
        notify("No se logró grabar la póliza", "warn");
      }
    } catch (e) {
      console.log("Exception setPoliza: " + e);
      //error.value = "Error de servidor";
      notify("Error al grabar la póliza", "error");
    } finally {
      loading.value = false;
    }
  };

  const updatePoliza = async (url, token, body) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const bodyParameters = {
      idPoliza: body.idPoliza,
      empleadoGenero: body.empleadoGenero,
      sku: body.sku,
      cantidad: body.cantidad,
    };

    loading.value = true;
    try {
      responseCoppel.value = null;
      const resp = await axios.put(url, JSON.stringify(bodyParameters), config);
      responseCoppel.value = resp.data;

      console.log("updatePoliza response = " + JSON.stringify(resp.data));

      if (resp.data.meta.status == "OK") {
        notify(
          "¡Póliza " +
            resp.data.data.poliza.idPoliza +
            " actualizada con éxito!",
          "success"
        );
        console.log(
          "updatePoliza = ¡Póliza " +
            resp.data.data.poliza.idPoliza +
            " actualizada con éxito!"
        );
        setTimeout(() => {
          router.push("/polizas");
        }, 1000);
      } else {
        notify("No se logró actualizar la póliza", "warn");
        console.log("No se logró actualizar la póliza");
      }
    } catch (e) {
      console.log("Exception updatePoliza: " + e);
      //error.value ='Error de servidor';
      notify("Error al actualizar la póliza", "error");
    } finally {
      loading.value = false;
    }
  };

  const deletePoliza = async (url, token) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    loading.value = true;
    try {
      responseCoppel.value = null;
      const resp = await axios.delete(url, config);
      responseCoppel.value = resp.data;

      console.log("deletePoliza response = " + JSON.stringify(resp.data));

      if (resp.data.meta.status == "OK") {
        //window.location.reload()
        notify(resp.data.data.mensaje, "success");

        router.push("/polizas");
        setTimeout(() => {
          location.reload();
        }, 3000);
        console.log(resp.data.data.mensaje);
      } else {
        notify("No se logró eliminar la póliza", "warn");
        console.log("No se logró eliminar la póliza");
      }
    } catch (e) {
      console.log("Exception deletePoliza: " + e);

      //error.value = "Error de servidor";
      notify("Error al eliminar la póliza", "error");
    } finally {
      loading.value = false;
    }
  };

  const getDataPoliza = async (url, token) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    loading.value = true;
    try {
      data.value = null;

      const resp = await axios.get(url, config);
      console.log("getDataPoliza response = " + JSON.stringify(resp.data));

      idEmpleado.value = JSON.stringify(resp.data.data.empleado.id);
      sku.value = JSON.stringify(resp.data.data.detalleArticulo.sku);
      cantidad.value = JSON.stringify(resp.data.data.poliza.cantidad);
      idPoliza.value = JSON.stringify(resp.data.data.poliza.idPoliza);

      data.value = resp.data;

      if (resp.data.meta.status == "OK") {
        notify("¡Se cargó la póliza correctamente!", "info");
      } else {
        notify("No se encontró la póliza seleccionada", "warn");
        router.push("/polizas");
      }
    } catch (e) {
      console.log("Exception getDataPoliza: " + e);

      //error.value ='Error de servidor'
      router.push("/polizas");
      notify("Error al cargar la póliza", "error");
    } finally {
      loading.value = false;
    }
  };

  const notify = (mensaje, tipo) => {
    if (tipo == "success") {
      toast.success(mensaje, {
        autoClose: 2000,
        position: "top-left",
      }); // ToastOptions
    } else if (tipo == "error") {
      toast.error(mensaje, {
        autoClose: 2000,
        position: "top-left",
      }); // ToastOptions
    } else if (tipo == "info") {
      toast.info(mensaje, {
        autoClose: 2000,
        position: "top-left",
      }); // ToastOptions
    } else if (tipo == "warn") {
      toast.warning(mensaje, {
        autoClose: 2000,
        position: "top-left",
      }); // ToastOptions
    } else {
      toast(mensaje, {
        autoClose: 2000,
        position: "top-left",
      }); // ToastOptions
    }
  };

  return {
    getDataPolizas,
    getDataEmpleados,
    getDataArticulos,
    setPoliza,
    notify,
    deletePoliza,
    getDataPoliza,
    updatePoliza,
    data,
    empleados,
    articulos,
    responseCoppel,
    loading,
    error,
    idEmpleado,
    sku,
    cantidad,
    idPoliza,
  };
};
