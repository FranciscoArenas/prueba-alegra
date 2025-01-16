<template>
  <div class="home shadow-2xl w-full lg:max-w-[82%]">
    <Sellers @sellersLoaded="handleSellersLoaded" />
    <Search @searchResults="handleSearchResults" />
    <ImageGallery
      :imagenes="imagenes"
      @onSelect="handleImageSelect" />

    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        class="bg-white p-6 rounded-lg shadow-lg relative max-w-[80%] max-h-[80%] overflow-auto text-center">
        <h2 class="text-xl font-bold mb-4">{{ selectedImage.title }}</h2>

        <img
          class="max-w-full max-h-[400px] object-contain mx-auto mb-4"
          :src="selectedImage.link"
          alt="Imagen Seleccionada" />

        <p class="text-gray-600 mb-4">
          <strong>Vendedor:</strong> {{ selectedImage.sellerName }}
        </p>

        <div class="flex justify-center gap-4">
          <button
            @click="voteForImage"
            class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">
            Votar
          </button>
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createInvoice } from "@/services/alegra/alegraService";
  import ImageGallery from "@/components/ImageGallery.vue";
  import Search from "@/components/SearchInput.vue";
  import Sellers from "@/components/Sellers";
  export default {
    name: "Home-vue",
    components: {
      Sellers,
      Search,
      ImageGallery
    },
    data() {
      return {
        imagenes: [],
        sellers: [],
        selectedImage: null
      };
    },
    methods: {
      handleSellersLoaded(sellers) {
        console.log(sellers);
        this.sellers = sellers;
      },
      handleSearchResults(results) {
        if (results.length === 0) {
          console.log("No se encontraron imágenes.");
          this.imagenes = [];
          return;
        }
        this.imagenes = results.map((imagen, index) => {
          const seller = this.sellers[index % this.sellers.length] || {};
          return {
            ...imagen,
            sellerName: seller.name || "Sin vendedor",
            sellerId: seller.id || null
          };
        });
      },
      handleImageSelect(imagen) {
        this.selectedImage = imagen;
      },
      async voteForImage() {
        const sellerId = this.selectedImage.sellerId;
        if (sellerId) {
          const data = JSON.parse(localStorage.getItem("sellerPoints")) || [];
          const updatedData = data.map((seller) =>
            seller.id === sellerId
              ? { ...seller, points: seller.points + 3 }
              : seller
          );
          localStorage.setItem("sellerPoints", JSON.stringify(updatedData));
          this.sellers = updatedData;
          const winner = updatedData.find((seller) => seller.points >= 20);
          if (winner) {
            await this.createInvoiceForWinner(winner);
            this.recordWinnerAndReset(winner);
          }
          this.closeModal();
        }
      },
      closeModal() {
        this.selectedImage = null;
      },
      recordWinnerAndReset(winner) {
        const registro = JSON.parse(localStorage.getItem("votingHistory")) || {
          votaciones: []
        };
        const nuevaVotacion = {
          id: registro.votaciones.length + 1,
          ganador: { id: winner.id, nombre: winner.name },
          fecha: new Date().toISOString()
        };
        registro.votaciones.push(nuevaVotacion);

        localStorage.setItem("votingHistory", JSON.stringify(registro));

        const reiniciado = this.sellers.map((seller) => ({
          ...seller,
          points: 0
        }));
        localStorage.setItem("sellerPoints", JSON.stringify(reiniciado));
        this.sellers = reiniciado;

        this.$emit("resetPoints", this.sellers);
      },
      async createInvoiceForWinner(winner) {
        try {
          const totalPoints = this.sellers.reduce(
            (sum, seller) => sum + seller.points,
            0
          );

          const invoiceData = {
            seller: winner.id,
            client: { id: 7 },
            date: new Date().toISOString().split("T")[0],
            dueDate: "2025-01-30",
            items: [
              {
                id: 2,
                price: 100.00,
                quantity: totalPoints,
                description: "Puntos acumulados por todos los participantes"
              }
            ],
            anotation: `Factura para ${winner.name} con ${totalPoints} puntos.`,
            termsConditions: "Pago dentro de 15 días.",
            currency: { code: "CLP" }
          };

          const response = await createInvoice(invoiceData);
          console.log("Factura creada exitosamente en Alegra:", response);

          alert(`Factura creada exitosamente para ${winner.name}`);
        } catch (error) {
          console.error("Error al crear la factura para el ganador:", error);
        }
      }
    }
  };
</script>

<style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
    position: relative;
    margin: 0 auto !important;
    padding: 0 20px;
    float: none !important;

    flex: 1 0 auto;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 40px !important;
    margin-bottom: 40px !important;
    padding: 20px 30px 60px 20px;
  }
  h1 {
    color: #2c3e50;
  }
  p {
    color: #42b983;
  }
  img {
    margin: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .modal button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .modal button:hover {
    background-color: #2c3e50;
  }
  .modal-enter-active {
    transition: opacity 0.3s ease;
  }
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter,
  .modal-leave-to {
    opacity: 0;
  }
</style>
