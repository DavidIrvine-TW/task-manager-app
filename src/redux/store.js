import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from '../../src/redux/boardsSlice'

const store = configureStore({
    reducer : {
        boards: boardsSlice.reducer,
    }
})

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("Kanban", JSON.stringify(state.boards));
  });


export default store