import { createSlice } from "@reduxjs/toolkit";
import data from "../../src/data/data.json";

const getLocalStorageData = () => {
  const data = localStorage.getItem("Kanban");
  return data ? JSON.parse(data) : data;
};

const boardsSlice = createSlice({
  name: "boards",
  initialState: getLocalStorageData() || data.boards ,
  reducers: {

    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.columnIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.subtaskIndex);
      subtask.isCompleted = !subtask.isCompleted;
    },


    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.columnIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
    

    addTask: (state, action) => {
      const { taskTitle, status, taskDescription, subtasks, statusIndex } = action.payload;
      const tasks = { title: taskTitle, description: taskDescription, subtasks: subtasks, status: status }; // newtask to be added
      const board = state.find((board) => board.isActive);// find active board
      const column = board.columns.find((column, index) => index === statusIndex);// find column by status eg todo = index 0'
      column.tasks.push(tasks);// adds to columns[0] by default.
    },


    editTask: (state, action) => {
      const {
        taskTitle,
        status,
        taskDescription,
        subtasks,
        columnIndex,
        statusIndex,
        taskIndex,
      } = action.payload;

      
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === columnIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);

      task.title = taskTitle;
      task.status = status;
      task.description = taskDescription;
      task.subtasks = subtasks;

      if (columnIndex === statusIndex) return; // same column
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newColumn = board.columns.find((col, index) => index === statusIndex);
      newColumn.tasks.push(task);
    },


    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
    },


    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.boardName;
      board.columns = payload.createdColumns;
    },


    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      state.splice(state.indexOf(board), 1);
    },


    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },

   
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.columnIndex);
      if (payload.columnIndex === payload.newStatusIndex) return;

      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newStatusIndex);
      newCol.tasks.push(task);
    },

   
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.boardName,
        isActive,
        columns: [],
      };
      board.columns = payload.createdColumns;
      state.push(board);
    },    
  },
});

export default boardsSlice;
