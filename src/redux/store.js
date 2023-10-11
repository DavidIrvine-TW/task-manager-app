import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from '../../src/redux/boardsSlice'

const store = configureStore({
    reducer : {
        boards: boardsSlice.reducer,
    }
})


export default store