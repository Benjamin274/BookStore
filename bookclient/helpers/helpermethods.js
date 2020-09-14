import axios from "../helpers/axios.js";
import { ref, onMounted } from "vue";
export function useGenreHelper() {
  let genres = ref([]);
  const getGenres = () => {
    axios
      .get("/genre")
      .then(response => {
        genres.value = response.data;
        console.log("response :>> ", response.data);
      })
      .catch(error => {
        console.log("error :>> ", error);
      });
  };
  onMounted(() => {
    getGenres();
  });

  return {
    genres
  };
}
