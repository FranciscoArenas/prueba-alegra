import axios from "axios";

const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;
const CX = process.env.VUE_APP_GOOGLE_CX;

const googleImagesAPI = axios.create({
  baseURL: "https://www.googleapis.com/customsearch/v1"
});

export const buscarImagenes = async (query) => {
  try {
    const response = await googleImagesAPI.get("", {
      params: {
        key: API_KEY,
        cx: CX,
        q: query,
        searchType: "image",
        num: 9
      }
    });
    return response.data.items;
  } catch (error) {
    console.error("Error al buscar imágenes en Google:", error);
    throw error;
  }
};
