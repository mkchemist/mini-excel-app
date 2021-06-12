<template>
  <div class="p-2 d-flex align-items-center  rounded shadow">
    <p class="mb-0">
      <span class="bi-upload mx-1"></span>
      <span>Uploader Control</span>
    </p>
    <div class="col bg-light p-2 mx-2 rounded">
      <ul class="nav">
        <li class="nav-item mx-1">
          <input
            type="file"
            ref="upload_input"
            style="display:none"
            @change="uploadFile"
          />
          <button class="btn btn-sm btn-secondary" @click="openUploadDialog">
            <span class="bi-upload mx-1"></span>
            <span>Upload</span>
          </button>
        </li>
        <li class="nav-item mx-1">
          <button class="btn btn-sm btn-secondary" @click="startAnalysis" :disabled="!file">
            <span class="mx-1 bi-lightbulb"></span>
            <span>start</span>
          </button>
        </li>
        <li class="nav-item mx-1">
          <button class="btn btn-sm btn-secondary" @click="closeFile" :disabled="!file">
            <span class="mx-1 bi-x"></span>
            <span>Close</span>
          </button>
        </li>
        <li class="nav-item mx-1">
          <router-link to="join" class="btn btn-sm btn-secondary">
            <span class="bi-arrow-left-right me-1"></span>
            <span>Join Sheets</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
      file() {
          return this.$store.getters.file;
      }
  },
  methods: {
    openUploadDialog() {
      this.$refs.upload_input.click();
    },
    uploadFile(e) {
      let files = e.target.files;
      if (!files.length) {
        return;
      }
        console.log(files[0])
      this.$store.commit("setFile", files[0]);
    },
    startAnalysis() {
        this.$store.dispatch("readXlsxFile", {
            file: this.file
        })
    },
    closeFile() {
      this.$refs.upload_input.value = null;
      this.$store.commit("closeFile");
    }
  },
};
</script>

<style></style>
