<template>
  <div class="seller-test">
    <div
      v-if="errorMessage"
      class="error">
      <p>Error: {{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
  import { getSellers, getSellerById } from "@/services/alegra/alegraService";

  const STORAGE_KEY = "sellerPoints";

  export default {
    name: "Seller-alegra",
    data() {
      return {
        sellers: [],
        selectedSeller: null,
        errorMessage: null
      };
    },
    mounted() {
      this.loadSellers();
    },
    methods: {
      async loadSellers() {
        try {
          this.errorMessage = null;
          const sellers = await getSellers();

          this.initializePoints(sellers);

          this.sellers = this.getPoints();
          this.$emit("sellersLoaded", this.sellers);
        } catch (error) {
          this.errorMessage = "Error al cargar los vendedores.";
          console.error(error);
        }
      },
      async loadSellerDetails(id) {
        try {
          this.errorMessage = null;
          this.selectedSeller = await getSellerById(id);
        } catch (error) {
          this.errorMessage = `Error al cargar los detalles del vendedor con ID ${id}.`;
          console.error(error);
        }
      },
      initializePoints(sellers) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          const initialData = sellers.map((seller) => ({
            id: seller.id,
            name: seller.name,
            points: 0
          }));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
      },
      getPoints() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      },
      addPoints(sellerId) {
        const data = this.getPoints();
        const updatedData = data.map((seller) =>
          seller.id === sellerId
            ? { ...seller, points: seller.points + 3 }
            : seller
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        this.sellers = updatedData;

        const winner = updatedData.find((seller) => seller.points >= 20);
        if (winner) {
          this.handleWinner(winner);
        }
      },
      handleWinner(winner) {
        alert(
          `¡Felicidades ${winner.name}! Has alcanzado 20 puntos y eres el ganador.`
        );
        const updatedData = this.sellers.map((seller) => ({
          ...seller,
          points: seller.id === winner.id ? 0 : seller.points
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        this.sellers = updatedData;
      }
    }
  };
</script>

<style scoped>
  .seller-test {
    padding: 20px;
  }
  button {
    margin: 5px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #2c3e50;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
</style>
