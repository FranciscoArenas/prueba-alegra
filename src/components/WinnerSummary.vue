<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Facturas por Vendedor</h2>
    <table
      class="table-auto w-full border-collapse border border-gray-200 shadow-lg">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">Nombre del Vendedor</th>
          <th class="border border-gray-300 px-4 py-2">ID de Factura</th>
          <th class="border border-gray-300 px-4 py-2">Anotación</th>
          <th class="border border-gray-300 px-4 py-2">Estrella</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(factura, index) in invoices"
          :key="index"
          class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 text-center">
            {{ factura.seller.name }}
          </td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            {{ factura.id }}
          </td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            {{ factura.items[0].description }} (Cantidad: {{ factura.items[0].quantity }})
          </td>
          <td
            class="border border-gray-300 px-4 py-2 text-center text-yellow-500">
            ⭐
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getInvoices } from "@/services/alegra/alegraService";
  export default {
    data() {
      return {
        invoices: null,
        errorMessage: null
      };
    },
    mounted() {
      this.loadInvoice();
    },
    methods: {
      async loadInvoice() {
        try {
          this.errorMessage = null;
          this.invoices = await getInvoices();
        } catch (error) {
          this.errorMessage = "Error al cargar los vendedores.";
          console.error(error);
        }
      }
    }
  };
</script>

<style scoped>
  .winner-summary {
    text-align: center;
    margin: 20px;
  }
</style>
