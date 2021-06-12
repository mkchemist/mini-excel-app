<template>
  <div class="">
      <p class="lead fw-bold text-decoration-underline text-primary">File Info.</p>
      <ul class="list-group list-group-flush px-0" v-if="file">
          <li class="list-group-item  small">
              <span>Name : </span>
              <span class="fw-bold text-decoration-underline">{{ file.name }}</span>
          </li>
          <li class="list-group-item  small">
              <span>Size : </span>
              <span class="fw-bold text-decoration-underline">{{ (file.size/1000).toFixed(1) }} kb</span>
          </li>
          <li class="list-group-item  small">
              <span>Extension : </span>
              <span class="fw-bold text-decoration-underline">{{ file.name.split('.')[1].toUpperCase() }} </span>
          </li>
      </ul>
      <div class="py-5" v-else>
          <p class="mb-0 text-center fst-italic">
              <span class="bi-check"></span>
              <span>No file loaded</span>
          </p>
      </div>
  </div>
</template>

<script>
export default {
    computed: {
        file() {
            return this.$store.getters.file;
        }
    }
}
</script>

<style lang="scss" >
    .list-group-item {
        word-wrap: break-word;
    }
</style>