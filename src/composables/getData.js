import axios from "axios";
import { ref } from "vue";

export const useGetData = () => {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(true);

  const getData = async (url) => {
    loading.value = true;
    try {
      const resp = await axios.get(url);
      data.value = resp.data;
      console.log(data);
    } catch (e) {
      console.log(e);
      error.value='error de servidor'
    } finally {
      loading.value = false;
    }
  };

  return {
    getData,
    data,
    loading,
    error
  };
};
