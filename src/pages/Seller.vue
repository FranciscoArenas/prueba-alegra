<template>
  <div class="seller-page p-6">
    <h1 class="text-2xl font-bold mb-6">Vendedores</h1>
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Nombre</th>
            <th class="border border-gray-300 px-4 py-2">Identificador</th>
            <th class="border border-gray-300 px-4 py-2">Cargo</th>
            <th class="border border-gray-300 px-4 py-2">Estado</th>
            <th class="border border-gray-300 px-4 py-2">Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="seller in sellersWithPoints"
            :key="seller.id">
            <td class="border border-gray-300 px-4 py-2 text-center">
              {{ seller.id }}
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              {{ seller.name }}
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
                {{ seller.identification || "N/A" }}
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              {{ seller.observations || "N/A" }}
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              {{ seller.status }}
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              {{ seller.points }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-6 text-right">
      <button
        @click="showCreateModal = true"
        class="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
        Crear Vendedor
      </button>
    </div>
    <CreateSellerModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @sellerCreated="handleNewSeller" />
  </div>
</template>

<script>
  import { getSellers } from "@/services/alegra/alegraService";
  import CreateSellerModal from "@/components/CreateSellerModal.vue";

  const STORAGE_KEY = "sellerPoints";

  export default {
    name: "SellerPage",
    components: {
      CreateSellerModal
    },
    data() {
      return {
        sellers: [],
        showCreateModal: false
      };
    },
    computed: {
      sellersWithPoints() {
        const localPoints = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        return this.sellers.map((seller) => {
          const points =
            localPoints.find((p) => p.id === seller.id)?.points || 0;
          return { ...seller, points };
        });
      }
    },
    mounted() {
      this.loadSellers();
    },
    methods: {
      async loadSellers() {
        try {
          const sellers = await getSellers();
          this.sellers = sellers;
          if (!localStorage.getItem(STORAGE_KEY)) {
            const initialPoints = sellers.map((seller) => ({
              id: seller.id,
              name: seller.name,
              points: 0
            }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPoints));
          }
        } catch (error) {
          console.error("Error al cargar los vendedores:", error);
        }
      },
      handleNewSeller(newSeller) {
        this.sellers.push(newSeller);
        const localPoints = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        localPoints.push({ id: newSeller.id, name: newSeller.name, points: 0 });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localPoints));

        this.showCreateModal = false;
      },
     
    }
  };
</script>

<style scoped>
  .seller-page {
    font-family: "Arial", sans-serif;
  }
  table {
    border-spacing: 0;
    text-align: left;
  }
</style>
