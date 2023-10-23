import { createSlice } from "@reduxjs/toolkit";
import data from "../../src/data/data.json";
import modifiedData from "../data/modifyData";

const getLocalStorageData = () => {
  const modifiedData = localStorage.getItem("Kanban");
  return modifiedData ? JSON.parse(modifiedData) : modifiedData;
};

const boardsSlice = createSlice({

  name: "boards",

  initialState: getLocalStorageData() || modifiedData.boards ,

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
      const { taskTitle, status, taskDescription, subtasks, statusIndex, taskId } = action.payload;
      const tasks = { id: taskId, title: taskTitle, description: taskDescription, subtasks: subtasks, status: status }; // newtask to be added
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
      const { newBoard } = action.payload;
      const activeBoardIndex = state.findIndex((board) => board.isActive);
    
      if (activeBoardIndex !== -1) {
        state[activeBoardIndex] = newBoard;
      } else {
        throw new Error("Active board not found.");
      }
    },

//     onDragDropTasks = (state, action) => {
//   const { currentBoardId, newBoard, newTask, newColId } = action.payload;

//   const data = current(state.data);
//   const exist = data.find((item) => item.id === currentBoardId);

//   if (exist) {
//     const newState = produce(data, (draftState) => {
//       const boardCopy = { ...newBoard };
//       const boardIndex = data.findIndex((item) => item.id === currentBoardId);
//       const colIndex = boardCopy.columns.findIndex((item) => item.id == newColId);
//       const taskIndex = boardCopy.columns[colIndex].tasks.findIndex((item) => item.id == newTask.id);

//       boardCopy.columns[colIndex].tasks[taskIndex] = {
//         ...boardCopy.columns[colIndex].tasks[taskIndex],
//         status: boardCopy.columns[colIndex].name,
//       };
//       draftState[boardIndex] = boardCopy;
//     });
//     return { ...state, data: newState };
//   } else throw console.error('on drag drop err');
// };


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
