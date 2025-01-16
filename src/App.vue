<template>
  <div
    id="app"
    class="min-h-screen">
    <AppHeader />
    <AppNavbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
  import AppHeader from "./components/AppHeader.vue";
  import AppFooter from "./components/AppFooter.vue";
  import AppNavbar from "./components/AppNavbar.vue";
  export default {
    name: "App",
    components: {
      AppHeader,
      AppFooter,
      AppNavbar
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    background-color: #f5f8fa;
    margin: 0 auto;
    padding: 0;
  }
</style>
