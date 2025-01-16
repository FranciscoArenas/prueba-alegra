<template>
  <div class="search">
    <div class="w-full max-w-sm min-w-[200px]">
      <div class="flex items-center w-full max-w-md mx-auto">
        <svg
          class="kb-search__mag"
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          style="user-select: text">
          <path
            d="M14.02 12.672l-3.64-3.64a5.687 5.687 0 0 0 1.06-3.312A5.726 5.726 0 0 0 5.72 0 5.726 5.726 0 0 0 0 5.72a5.726 5.726 0 0 0 5.72 5.72 5.687 5.687 0 0 0 3.311-1.06l3.641 3.64a.95.95 0 0 0 1.348 0 .953.953 0 0 0 0-1.348zm-8.3-3.139a3.813 3.813 0 1 1 0-7.626 3.813 3.813 0 0 1 0 7.626z"
            fill="#4A4A4A"
            fill-rule="evenodd"
            style="user-select: text"></path>
        </svg>

        <input
          v-model="query"
          class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-l-lg pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Ingresa una palabra clave" />

        <button
          class="w-8/12 py-2 px-2 rounded-r-lg transition bg-slate-800 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          @click="buscar">
          Buscar Imágenes
        </button>
      </div>
      <div class="flex py-6 gap-2 justify-center">
        <button
          class="recommendation-btn"
          @click="buscarRecomendacion('RTX')">
          RTX
        </button>
        <button
          class="recommendation-btn"
          @click="buscarRecomendacion('AMD')">
          AMD
        </button>
        <button
          class="recommendation-btn"
          @click="buscarRecomendacion('Intel')">
          Intel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { buscarImagenes } from "@/services/google/googleImagesServices";
  export default {
    props: {
      onSearch: Function
    },
    data() {
      return {
        query: "",
        imagenes: []
      };
    },
    methods: {
      async buscar() {
        try {
          const resultados = await buscarImagenes(this.query);
          this.imagenes = Array.isArray(resultados) ? resultados : [];
          this.$emit("searchResults", this.imagenes);
        } catch (error) {
          console.error("Error al buscar imágenes:", error);
          this.imagenes = [];
        }
      },
      buscarRecomendacion(termino) {
        this.query = termino;
        this.buscar();
      }
    }
  };
</script>

<style scoped>
  .search {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px 0;
  }
  svg {
    position: absolute;
    margin-left: 15px;
  }
  .recommendation-btn {
    background-color: #00d6bc;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .recommendation-btn:hover {
    background-color: #00b59c;
  }
</style>
