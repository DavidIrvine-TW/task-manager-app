import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from '../redux/boardsSlice'
import modalReducer from '../redux/modalSlice'

export const store = configureStore({
    reducer : {
        boards: boardsSlice.reducer,
        modal: modalReducer,
    }
})

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("Kanban", JSON.stringify(state.boards));
  });


export default store