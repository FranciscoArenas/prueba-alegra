<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <h2 class="text-xl font-bold mb-4">Crear Vendedor</h2>

      <form @submit.prevent="createSeller">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Nombre:</label>
          <input
            v-model="seller.name"
            type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-teal-300"
            placeholder="Nombre del vendedor"
            required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Cargo:</label>
          <input
            v-model="seller.observations"
            type="text"
            class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-teal-300"
            placeholder="Identificación del vendedor" />
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">
            Crear
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { createSeller } from "@/services/alegra/alegraService";

  export default {
    name: "CreateSellerModal",
    data() {
      return {
        seller: {
          name: "",
          identification: "",
          observations: ""
        }
      };
    },
    methods: {
      generateRandomId() {
        return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
      },
      async createSeller() {
        try {
          this.seller.identification = this.generateRandomId();
          console.log(this.seller);
          const newSeller = await createSeller(this.seller);
          this.$emit("sellerCreated", newSeller);
          this.$emit("close");
        } catch (error) {
          console.error("Error al crear vendedor:", error);
          alert(
            "No se pudo crear el vendedor. Por favor, inténtalo nuevamente."
          );
        }
      }
    }
  };
</script>

<style scoped>
  /* Estilo para el modal */
</style>
