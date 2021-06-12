<template>
  <div class="file-view">
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
      <div class="dropdown mx-2">
        <a href="" class="dropdown-toggle" data-bs-toggle="dropdown"
          >Distinct By</a
        >
        <ul class="dropdown-menu">
          <li class="dropdown-item p-0 small border-bottom fw-bold">
            <input
              type="radio"
              class="mx-1"
              :value="null"
              v-model="distinctBy"
            />
            <span class="small">None</span>
          </li>
          <li
            class="dropdown-item p-0 small"
            v-for="(head, headIndex) in allHeaders"
            :key="`view_headers_${head}_${headIndex}`"
          >
            <input
              type="radio"
              class="mx-1"
              :value="head"
              v-model="distinctBy"
              checked
            />
            <span class="small">{{ head }}</span>
          </li>
        </ul>
      </div>
      <div class="dropdown mx-2">
        <a href="" class="dropdown-toggle" data-bs-toggle="dropdown"
          >Download</a
        >
        <ul class="dropdown-menu">
          <li class="dropdown-menu-item small py-0 my-0">
            <a
              href=""
              class="nav-link small text-dark py-1"
              @click.prevent="download('xlsx')"
            >
              <span class="bi-file-arrow-down-fill"></span>
              <span>XLSX</span>
            </a>
          </li>
          <li class="dropdown-menu-item small py-0 my-0">
            <a
              href=""
              class="nav-link small text-dark py-1"
              @click.prevent="download('csv')"
            >
              <span class="bi-file-arrow-down-fill"></span>
              <span>CSV</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- Table search and adjust -->
    <div class="d-flex justify-content-between align-items-center">
      <div class="small text-muted">
        <span>Result Per Page </span>
        <select v-model="pagination.rpp">
          <option v-for="(rpp, i) in menuLength" :key="`rpp_${i}_${rpp}`">{{
            rpp
          }}</option>
        </select>
      </div>
      <div class="border d-flex rounded px-2">
        <input
          type="text"
          v-model="search"
          class="form-control-plaintext form-control-sm no-outline"
          placeholder="Search ..."
        />
        <span class="fw-bold pointer" @click="clearSearch" v-if="search"
          >&times;</span
        >
      </div>
    </div>
    <!-- table info -->
    <div class="my-1">
      <p class="mb-0 small text-muted">total found {{ sheetData.length }}</p>
    </div>
    <div class="table-responsive table-container">
      <!-- Table -->
      <table
        class="table table-responsive table-striped table-sm small"
        id="data-table"
      >
        <thead>
          <tr>
            <th
              v-for="(head, headIndex) in headers"
              :key="`head_${head}_${headIndex}`"
              class="border p-1"
            >
              <div class="d-flex">
                <span
                  type="text"
                  class="cell col"
                  :data-header-index="headIndex"
                  :contenteditable="true"
                  @change="updateHeaders"
                  >{{ head }}</span
                >
                <span
                  :class="
                    `${
                      sortType === 'asc' && sort ? 'bi-sort-up' : 'bi-sort-down'
                    }`
                  "
                  style="cursor:pointer"
                  @click="setSortBy(head)"
                ></span>
                <div class="dropdown export-remove">
                  <a href="" class="dropdown-toggle" data-bs-toggle="dropdown"
                    ><span class="bi-filter"></span
                  ></a>
                  <ul class="dropdown-menu">
                    <li
                      class="dropdown-item small"
                      v-for="(item, itemIndex) in headerDistinctValues[head]"
                      :key="`header_${head}_filter_${item}_${itemIndex}`"
                    >
                      <input
                        type="checkbox"
                        class="me-1"
                        :value="{ key: head, val: item }"
                        v-model="filters"
                      />
                      <span class="small">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in sheetData" :key="`row_${rowIndex}`">
            <td
              v-for="(col, colIndex) in headers"
              :key="`row_${rowIndex}_col_${colIndex}`"
              class="col-12 p-1"
            >
              <span
                type="text"
                class="cell col-12"
                :data-row-index="rowIndex"
                :data-col-key="col"
                @change="updateCell"
                >{{ row[col] }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-1 row mx-auto">
      <button
        class="btn btn-light btn-sm border col-auto mx-1 my-1"
        :disabled="pagination.start === 1"
        @click="setPage(1)"
        type="button"
      >
        First Page
      </button>
      <button
        :class="
          `btn ${
            page === pagination.start ? `btn-primary` : `btn-light`
          } btn-sm border col-auto mx-1 my-1`
        "
        v-for="page in totalPages"
        :key="`page_${page}`"
        @click="setPage(page)"
        type="button"
      >
        {{ page }}
      </button>
      <button
        class="btn btn-light btn-sm border col-auto mx-1 my-1"
        :disabled="pagination.start === totalPages"
        @click="setPage(totalPages)"
        type="button"
      >
        Last Page
      </button>
    </div>
  </div>
</template>

<script>
import { collectDistinctData, sortByItem } from "../../helpers";
import xlsx from "xlsx";
export default {
  mounted() {},
  components: {},
  computed: {
    sourceData() {
      let data = this.$store.getters.activeSheetJson;
      if (this.distinctBy) {
        let d = collectDistinctData(data, this.distinctBy);
        return d;
      }
      return data;
    },
    viewData() {
      let data = this.sourceData;
      if (this.sort) {
        data = sortByItem(data, this.sort, this.sortType);
      }
      if (this.filters.length) {
        this.filters.map(filter => {
          data = data.filter(row => row[filter.key] === filter.val);
        });
      }
      if (this.search) {
        data = data.filter(item => {
          for (let key in item) {
            if (
              item[key]
                .toString()
                .toLowerCase()
                .includes(this.search.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });
      }

      return data;
    },
    sheetData() {
      let start = (this.pagination.start - 1) * this.pagination.rpp;
      let end = this.pagination.start * this.pagination.rpp;
      return this.viewData.slice(start, end);
    },
    allHeaders() {
      let headers = new Set();
      this.sourceData.map(row => {
        Object.keys(row).map(key => headers.add(key));
      })
      return headers;
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
      this.sourceData.map(row => {
        Object.keys(row).map(key => {
          if (!res[key]) {
            res[key] = new Set();
          }
          res[key].add(row[key]);
        });
      });
      return res;
    },
    totalPages() {
      return Math.ceil(this.viewData.length / this.pagination.rpp);
    }
  },
  data: () => ({
    edits: {
      header: [],
      body: []
    },
    allowedHeads: [],
    sort: null,
    sortType: "asc",
    filters: [],
    menuLength: [20, 50, 100],
    pagination: {
      start: 1,
      rpp: 20
    },
    search: null,
    contextMenu: {
      x: null,
      y: null
    },
    distinctBy: null
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
      if (this.sort && this.sort === item) {
        if (this.sortType === "asc") {
          this.sortType = "desc";
        } else {
          this.sortType = "asc";
        }
      }
    },
    clearSearch() {
      this.search = null;
    },
    download(type) {
      let table = document.getElementById("data-table");
      let clone = table.cloneNode();
      clone.innerHTML = table.innerHTML;
      clone.querySelectorAll(".export-remove").forEach(i => {
        i.remove();
      });
      let sheet = xlsx.utils.json_to_sheet(this.sourceData);
      let wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, sheet, "sheet1");
      xlsx.writeFile(wb, "Export File." + type);
    },
    setPage(page) {
      this.pagination.start = page;
    }
  }
};
</script>

<style></style>
