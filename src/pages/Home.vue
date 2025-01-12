<template>
  <div class="home">
    <div>
      <input
        v-model="query"
        placeholder="Ingresa una palabra clave" />
      <button @click="buscar">Buscar Imágenes</button>

      <div v-if="imagenes && imagenes.length > 0">
        <h2>Resultados:</h2>
        <div
          v-for="imagen in imagenes"
          :key="imagen.link">
          <img
            :src="imagen.link"
            :alt="imagen.title" />
          <p>{{ imagen.title }}</p>
        </div>
      </div>
      <div v-else>
        <p>No hay resultados para mostrar.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { buscarImagenes } from "@/services/googleImagesServices";
  export default {
    name: "Home-vue",

    data() {
      return {
        query: "",
        imagenes: []
      };
    },

    methods: {
      async buscar() {
        try {
          this.imagenes = await buscarImagenes(this.query);
        } catch (error) {
          console.error("Error al buscar imágenes:", error);
        }
      }
    }
  };
</script>

<style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  h1 {
    color: #2c3e50;
  }
  p {
    color: #42b983;
  }
  img {
    max-width: 200px;
    margin: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
</style>
