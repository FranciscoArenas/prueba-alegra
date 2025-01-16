<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex space-x-6">
        <a
          href="/"
          class="text-gray-700 hover:text-teal-600 font-medium transition">
          Galería
        </a>
        <a
          href="/vendedores"
          class="text-gray-700 hover:text-teal-600 font-medium transition">
          Vendedores
        </a>
        <a
          href="/winner"
          class="text-gray-700 hover:text-teal-600 font-medium transition">
          Ganadores
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "App-Navbar"
  };
</script>

<style scoped>
  .sticky {
    position: sticky;
  }
</style>
