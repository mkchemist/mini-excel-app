<template>
  <div class="p-2">
    <uploader-controller />
    <div class="row mx-auto my-2">
      <div class="col-lg-3 border bg-light pb-5 rounded">
        <uploader-file-info />
      </div>
      <div class="col-lg-9">
        <uploader-file-sheets />
        <div class="p-2" v-if="activeSheetJson.length">
          <uploader-view-sheet />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploaderController from "../components/uploader/UploaderController.vue";
import UploaderFileInfo from "../components/uploader/UploaderFileInfo.vue";
import UploaderFileSheets from "../components/uploader/UploaderFileSheets.vue";
import UploaderViewSheet from "../components/uploader/UploaderViewSheet.vue";
export default {
  components: {
    UploaderController,
    UploaderFileInfo,
    UploaderFileSheets,
    UploaderViewSheet
  },
  computed: {
    activeSheetJson() {
      return this.$store.getters.activeSheetJson;
    },
  }
};
</script>

<style></style>
