<template>
  <div class="header bg-white  p-2">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/" class="navbar-brand">
        <span class="bi-file-excel"></span>
        <span>Excel</span>
      </router-link>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#app_navbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="app_navbar">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" :excat="true">
              <span class="bi-house mx-1"></span>
              <span>Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/upload" class="nav-link" active-class="active" :exact="true">
              <span class="bi-upload mx-1"></span>
              <span>Upload</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
