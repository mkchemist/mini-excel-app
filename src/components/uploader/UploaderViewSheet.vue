<template>
  <div style="overflow:auto" class="file-view">
    <!-- Controller -->
    <div class="my-2 view-control d-flex">
      <div class="dropdown">
        <a href="" class="dropdown-toggle" data-bs-toggle="dropdown">view</a>
        <ul class="dropdown-menu">
          <li
            class="dropdown-item p-0 small"
            v-for="(head, headIndex) in allHeaders"
            :key="`view_headers_${head}_${headIndex}`"
          >
            <input
              type="checkbox"
              class="mx-1"
              :value="head"
              v-model="allowedHeads"
              checked
            />
            <span class="small">{{ head }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- table info -->
    <div class="my-1">
      <p class="mb-0 small text-muted">total found {{ sheetData.length }}</p>
    </div>
    <!-- Table -->
    <table class="table table-responsive table-striped table-sm small">
      <thead>
        <tr>
          <th
            v-for="(head, headIndex) in headers"
            :key="`head_${head}_${headIndex}`"
            class="border"
          >
            <input
              type="text"
              :value="head"
              class="cell col-auto"
              :data-header-index="headIndex"
              @change="updateHeaders"
            />
            <span
              class="bi-sort-up"
              style="cursor:pointer"
              @click="setSortBy(head)"
            ></span>
            <div class="dropdown">
              <a href="" class="dropdown-toggle" data-bs-toggle="dropdown"
                ><span class="bi-filter"></span
              ></a>
              <ul class="dropdown-menu">
                <li
                  class="dropdown-item small"
                  v-for="(item, itemIndex) in headerDistinctValues[head]"
                  :key="`header_${head}_filter_${item}_${itemIndex}`"
                >
                  <input type="checkbox" class="me-1" :value="{key: head, val: item}" v-model="filters">
                  <span class="small">{{ item }}</span>
                </li>
              </ul>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sheetData" :key="`row_${rowIndex}`">
          <td
            v-for="(col, colIndex) in headers"
            :key="`row_${rowIndex}_col_${colIndex}`"
            class="col-12"
          >
            <input
              type="text"
              :value="row[col]"
              class="cell"
              :data-row-index="rowIndex"
              :data-col-key="col"
              @change="updateCell"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { sortByItem } from "../../helpers";
export default {
  mounted() {},
  computed: {
    sourceData() {
      return this.$store.getters.activeSheetJson;
    },
    sheetData() {
      let data = this.$store.getters.activeSheetJson;
      if (this.sort) {
        data = sortByItem(data, this.sort);
      }
      if(this.filters.length) {
        this.filters.map(filter => {
          data = data.filter(row => row[filter.key] === filter.val)
        })
      }
      return data;
    },
    allHeaders() {
      return Object.keys(this.sheetData[0]).map(key => key);
    },
    headers() {
      if (this.sheetData.length) {
        let headers = [];
        Object.keys(this.sheetData[0]).map(key => {
          if (this.allowedHeads.length) {
            /* if(this.allowedHeads.includes(key)) {
              headers.push(key)
            } */
            headers = this.allowedHeads;
          } else {
            return headers.push(key);
          }
        });
        return headers;
      }
      return [];
    },
    headerDistinctValues() {
      let res = {};
      this.sheetData.map(row => {
        Object.keys(row).map(key => {
          if (!res[key]) {
            res[key] = new Set();
          }
          res[key].add(row[key]);
        });
      });
      return res;
    }
  },
  data: () => ({
    edits: {
      header: [],
      body: []
    },
    allowedHeads: [],
    sort: null,
    filters: []
  }),
  methods: {
    updateHeaders(e) {
      let target = e.target;
      let value = target.value;
      let index = target.dataset.headerIndex;
      this.edits.header.push({
        index,
        value
      });
    },
    updateCell(e) {
      let target = e.target;
      let value = target.value;
      let row = target.dataset.rowIndex;
      let col = target.dataset.colKey;
      this.edits.body.push({
        row,
        col,
        value
      });
    },
    setSortBy(item) {
      this.sort = item;
    }
  }
};
</script>

<style></style>
