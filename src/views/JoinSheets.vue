<template>
  <div class="p-2 ">
    <uploader-controller />
    <div class="px-0 border pb-5">
      <div class="p-2 bg-secondary text-light">
        <span class="bi-arrow-left-right me-1"></span>
        <span>Join Tables</span>
      </div>
      <div class="p-2">
        <!-- Tables selection -->
        <div class="p-2 row justify-content-between align-items-center">
          <div class="col-6 d-flex my-2">
            <label for="" class="fw-bold small text-primary">Master</label>
            <select v-model="master" class="form-control form-control-sm mx-1">
              <option :value="null">Select</option>
              <option v-for="(sheet,sheetIndex) in sheets" :key="`master_sheet_${sheetIndex}`" :value="sheet">{{ sheet }}</option>
            </select>
          </div>
          <div class="col-6 d-flex my-2">
            <label for="" class="fw-bold small text-primary">Follower</label>
            <select v-model="follower" class="form-control form-control-sm mx-1">
              <option :value="null">Select</option>
              <option v-for="(sheet,sheetIndex) in sheets" :key="`follower_sheet_${sheetIndex}`" :value="sheet">{{ sheet }}</option>
            </select>
          </div>
          <div class="col d-flex">
            <label for="" class="fw-bold small text-primary">Key master</label>
            <select v-model="key" class="form-control form-control-sm mx-1 col" :disabled="!masterHeaders.length">
              <option :value="null">Select</option>
              <option v-for="(masterHead,headIndex) in masterHeaders" :key="`follower_sheet_${headIndex}`" :value="masterHead">{{ masterHead }}</option>
            </select>
          </div>
          <div class="col d-flex">
            <label for="" class="fw-bold small text-primary">Key follower</label>
            <select v-model="fkey" class="form-control form-control-sm mx-1 col" :disabled="!masterHeaders.length">
              <option :value="null">Select</option>
              <option v-for="(followerHead,headIndex) in followerHeaders" :key="`follower_sheet_${headIndex}`" :value="followerHead">{{ followerHead }}</option>
            </select>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-sm btn-primary" :disabled="!master || !follower" @click="showHeaders">
              <span class="bi-check-circle me-1"></span>
              <span>Select</span>
            </button>
            <button type="button" class="btn btn-sm btn-primary mx-1" :disabled="!master || !follower" @click="resetHeaders">
              <span class="bi-arrow-repeat me-1"></span>
              <span>reset</span>
            </button>
          </div>
        </div>
        <!-- End of table selection -->
        <!-- Table Headers -->
        <div class="row mx-auto" v-if="viewHeaders">
          <div class="col p-2">
            <ul class="border list-group list-group-flush nav">
              <li v-for="(head,i) in masterHeaders" :key="`master_headers_${i}`" class="list-group-item small p-1">
                <input type="checkbox" :value="head" v-model="removedHeads">
                <label for="" class="form-check-inline mx-2">{{ head }}</label>
              </li>
            </ul>
          </div>
          <div class="col-auto d-flex flex-column align-items-center justify-content-center">
           
            <button class="btn btn-light btn-sm my-1 border" @click="deleteHeads">
              <span class="bi-x"></span>
            </button>
          </div>
          <div class="col p-2">
            <ul class="border list-group list-group-flush nav">
              <li v-for="(head,i) in followerHeaders" :key="`follower_headers_${i}`" class="list-group-item small p-1">
                <input type="checkbox" :value="head" v-model="addedHeads">
                <label for="" class="form-check-inline mx-2">{{ head }}</label>
              </li>
            </ul>
          </div>
        </div>
        <!-- End of Table headers -->
        <div class="text-end my-2" v-if="viewHeaders">
          <button class="btn btn-sm btn-success" @click="joinSheets">
            <span class="bi-arrow-left-right"></span>
            <span>Join</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploaderController from '../components/uploader/UploaderController.vue'
import xlsx from "xlsx"
export default {
  components: { UploaderController },
  name: "JoinSheets",
  computed: {
    sheets() {
      return this.$store.getters.sheets
    },
    masterHeaders() {
      if(this.master) {
        try {

          let sheet = this.$store.getters.workbook.Sheets[this.master]
          sheet = xlsx.utils.sheet_to_json(sheet);
          let sheetHeads =  Object.keys(sheet[0]).map(key => key);
          let heads = [];
          sheetHeads.map(i => {
            if(!this.deletedHeads.includes(i)) {
              heads.push(i)
            }
          })
          return [...heads, ...this.addedHeads]
        
        }catch(e) {
          console.log(e)
          return []
        }
      }
      return []
    },
    followerHeaders() {
      if(this.follower) {
        let sheet = this.$store.getters.workbook.Sheets[this.follower]
        sheet = xlsx.utils.sheet_to_json(sheet);
        return Object.keys(sheet[0]).map(key => key);
      }
      return []
    }
  },
  data: () => ({
    master: null,
    follower: null,
    key: null,
    fkey: null,
    viewHeaders: false,
    removedHeads: [],
    addedHeads: [],
    deletedHeads: [],
  }),
  methods: {
    showHeaders() {
      this.viewHeaders = true;
    },
    resetHeaders() {
      this.removedHeads = [];
      this.addedHeads = [];
      this.deletedHeads = [];
    },
    deleteHeads() {
      console.log("clicked")
      this.deletedHeads =[ ...this.removedHeads];
      this.removedHeads = [];
    },
    joinSheets() {
      this.$store.dispatch("joinSheets", {
        key: this.key,
        fkey: this.fkey,
        master: this.master,
        follower: this.follower,
        added: Array.from(this.addedHeads)
      })
    }
  }
}
</script>

<style>

</style>