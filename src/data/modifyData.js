// import { v4 as uuidv4 } from "uuid";
// import initialData from './data.json';

// const addUniqueIds = (data) => {
//   data.boards.forEach((board) => {
//     board.columns.forEach((column) => {
//       column.tasks.forEach((task) => {
//         const modifiedTask = {
//           id: uuidv4(),
//           ...task
//         };
//         column.tasks[column.tasks.indexOf(task)] = modifiedTask;
//       });
//     });
//   });
//   return data; // default data returned with taskIds added
// };

// const modifiedData = addUniqueIds(initialData); 

// export default modifiedData; 
import { v4 as uuidv4 } from "uuid";
import initialData from './data.json';

const addUniqueIds = (data) => {
  data.boards.forEach((board) => {
    board.board_id = uuidv4(); // Assigning unique ID to the board
    board.columns.forEach((column) => {
      column.column_id = uuidv4(); // Assigning unique ID to the column
      column.tasks.forEach((task) => {
        task.task_id = uuidv4(); // Assigning unique ID to the task
      });
    });
  });
  return data; // Default data returned with IDs added
};

const modifiedData = addUniqueIds(initialData); 
export default modifiedData;