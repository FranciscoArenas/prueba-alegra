<template>
  <div class="mood-board grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
    <figure
      v-for="(imagen, index) in localImagenes"
      :key="imagen.id || imagen.link"
      class="relative overflow-hidden rounded-lg shadow-lg group"
      :class="getGridClass(index)"
      @click="seleccionar(imagen)">
      <img
        :src="imagen.link"
        :alt="imagen.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        @error="handleImageError(imagen)" />
      <figcaption
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {{ imagen.title }}
      </figcaption>
    </figure>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        localImagenes: [...this.imagenes]
      };
    },
    props: {
      imagenes: Array
    },
    watch: {
      imagenes: {
        handler(newVal) {
          this.localImagenes = [...newVal];
        },
        immediate: true
      }
    },
    methods: {
      getGridClass(index) {
        const layoutClasses = [
          "row-span-2 col-span-2",
          "col-span-1",
          "row-span-1 col-span-1",
          "row-span-2 col-span-1",
          "row-span-1 col-span-2"
        ];
        return layoutClasses[index % layoutClasses.length];
      },
      seleccionar(imagen) {
        this.$emit("onSelect", imagen);
      },
      handleImageError(imagen) {
        const index = this.localImagenes.indexOf(imagen);
        if (index > -1) {
          this.localImagenes.splice(index, 1);
        }
        console.error(`Imagen eliminada: ${imagen.title}`);
      }
    }
  };
</script>

<style scoped>
  .mood-board img {
    display: block;
  }
</style>
