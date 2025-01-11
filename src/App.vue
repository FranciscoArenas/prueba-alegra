<template>
  <div id="app">
    <!-- Header de la aplicación -->
    <header>
      <h1>Imágenes del Mundo - Carrera de Vendedores</h1>
    </header>

    <!-- Router View para manejar las rutas principales -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos globales */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
}

header {
  background-color: #42b983;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

header h1 {
  margin: 0;
  font-size: 2em;
}
</style>
