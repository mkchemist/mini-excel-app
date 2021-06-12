<template>
  <div class="bg-secondary full-height">
    <div class="container">
      <app-navbar />
      <div class="bg-white my-2 full-height">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script>
  import AppNavbar from './components/AppNavbar.vue';
  export default {
    components: {
      AppNavbar
    },
    
  }
</script>

<style lang="scss" scoped>
  .full-height {
    min-height: 680px;
  }
</style>
