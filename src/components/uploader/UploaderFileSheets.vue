<template>
  <div class="p-2 file-sheets">
    <div class="d-flex align-items-center">
      <div>
        <p class="mb-0">File Sheets</p>
        <p class="mb-0 small text-muted">select sheet to open</p>
      </div>
      <ul class="nav col bg-light mx-2 p-2">
        <li
          v-for="(sheet, i) in sheets"
          :key="`sheet_${i}_${sheet}`"
          class="nav-item border rounded"
        >
          <a
            href=""
            :class="
              `nav-link ${
                selectedSheet === sheet ? 'bg-primary text-light' : 'text-dark'
              }`
            "
            @click.prevent="selectSheet(sheet)"
          >
            <span class="bi-file-spreadsheet-fill"></span>
            <span>{{ sheet }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sheets() {
      return this.$store.getters.sheets;
    },
    selectedSheet() {
      return this.$store.getters.selectedSheet;
    }
  },
  methods: {
    selectSheet(sheet) {
      this.$store.commit("selectSheet", sheet);
    }
  }
};
</script>

<style lang="scss">
.file-sheets {
  .nav-item {
    transition: 0.3s;

    &:hover {
      background-color: royalblue;
      a {
        color: #fff !important;
      }
    }
  }
}
</style>
