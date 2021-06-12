import xlsx from "xlsx";
export default {
  state: {
    file: null,
    workbook: null,
    sheets: [],
    selectedSheet: null,
    activeSheet: null,
  },
  getters: {
    file: (state) => state.file,
    workbook: (state) => state.workbook,
    sheets: (state) => state.sheets,
    selectedSheet: (state) => state.activeSheet,
    activeSheet: (state) => state.activeSheet,
    activeSheetJson: state => xlsx.utils.sheet_to_json(state.activeSheet)
  },
  mutations: {
      setFile(state, payload) {
          state.file = payload
      },
      setWorkbook(state, payload) {
          state.workbook = payload;
          state.sheets = payload.SheetNames
      },
      selectSheet(state, payload) {
          state.selectedSheet = payload;
          state.activeSheet = state.workbook.Sheets[payload];
      }
  },
  actions: {
      readXlsxFile({commit}, payload) {
        let file = payload.file;
        let reader = new FileReader;
        reader.onload = e => {
            commit("setWorkbook", xlsx.read(new Uint8Array(e.target.result), {type: "array"}));
        }
        reader.readAsArrayBuffer(file);
      }
  },
};
