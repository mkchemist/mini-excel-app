import xlsx from "xlsx";
import { joinTable } from "../helpers";
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
    selectedSheet: (state) => state.selectedSheet,
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
      },
      closeFile(state) {
        state.file = null;
        state.workbook = null;
        state.sheets = [];
        state.selectedSheet = null;
        state.activeSheet = null;
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
      },
      joinSheets(module, payload) {
        let {key, master, follower, added, fkey} = payload;
        let masterSheet = xlsx.utils.sheet_to_json(module.state.workbook.Sheets[master])
        let followerSheet = xlsx.utils.sheet_to_json(module.state.workbook.Sheets[follower])
        let data = joinTable(masterSheet,followerSheet,key,fkey,added);
        let newSheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(module.state.workbook,newSheet, `join_${master}`);
      }
  },
};
