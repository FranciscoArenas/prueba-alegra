<template>
    <div class="home">
      <WinnerSummary />
    </div>
  </template>
  
  <script>
  import WinnerSummary from '@/components/WinnerSummary.vue';
  export default {
    name: 'Home-win',
    components: {
      WinnerSummary
    }
  };
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  h1 {
    color: #2c3e50;
  }
  p {
    color: #42b983;
  }
  </style>