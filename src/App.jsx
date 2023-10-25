import { useState } from "react";
import Nav from "./components/navbar/Nav";
import BoardsMenuModal from "./components/modals/BoardsMenuModal";
import AddBoardModal from "./components/modals/AddBoardModal";
import AddEditTaskModal from "./components/modals/AddEditTaskModal";
import DeleteEditMenuModal from "./components/modals/DeleteEditMenuModal";
import DeleteBoardAndTaskModal from "./components/modals/DeleteBoardModal";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./components/navbar/SideNav";
import EmptyBoard from "./components/emptyBoard/EmptyBoard";
import ScrollContainer from "react-indiana-drag-scroll";
import Column from "./components/boards/Column";
import AddIcon from "@mui/icons-material/Add";
import TaskModal from "./components/modals/TaskModal";
import { DragDropContext, resetServerContext } from '@hello-pangea/dnd';
import boardsSlice from "./redux/boardsSlice";




function App() {
  const dispatch = useDispatch();
  // modal display (probably should have used redux to control modal display... food for thought next time)
  const [taskModalOpen, setTaskModalOpen] = useState(false); 
  const [boardMenu, setBoardMenu] = useState(false); 
  const [createBoardMenu, setCreateBoardMenu] = useState(false); 
  const [newTaskMenu, setNewTaskMenu] = useState(false); 
  const [ellipsesMenu, setElippsesMenu] = useState(false); 
  const [deleteBoardModal, setDeleteBoardModal] = useState(false); 
  const [sideNavOpen, setSideNavOpen] = useState(true);
  // defaults
  const [taskTaskIndex, setTaskTaskIndex] = useState(0); 
  const [taskColumnIndex, setTaskColumnIndex] = useState(0); 
  // modal set types
  const [type, setBoardMode] = useState(""); 
  const [taskType, setTaskMode] = useState(""); 
  const [deleteMode, setDeleteMode] = useState("")

  const boards = useSelector((state) => state.boards); //all boards
  const board = boards.find((board) => board.isActive === true); //active board
  if (!board && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 })); // if no boards, first board created is active. ensures always an active board

  const columns = board?.columns; //render active board columns

  const [draggableData, setDraggableData] = useState(board);


  // drag n drop
  const onDragEnd = (result)=> {
    const {destination, source} = result
    console.log('result', result)
    

    // not a droppable destination
    if(!result.destination) {
      return
    }

    //same column same position
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }

    //same column different index
    const sourceColumn = draggableData.columns.find((column, index) => index == source.droppableId)
    const destinationColumn = draggableData.columns.find((column, index) => index == destination.droppableId)
    const draggedTask = sourceColumn?.tasks[source.index]
  
    if(source.droppableId === destination.droppableId && destination.index !== source.index){

      const taskList = Array.from(sourceColumn.tasks)
      const [movedTask] = taskList.splice(source.index, 1)
      taskList.splice(destination.index, 0, movedTask)

      const newColumn = {
        ...sourceColumn,
        tasks: taskList,
      };

      const newBoard = {
        ...board,
        columns: Object.values({ ...board.columns, [source.droppableId]: newColumn }),
      }

      console.log('newboard',newBoard)
      console.log('oldboard', board)  
      dispatch(boardsSlice.actions.dragTask(
        {newBoard: newBoard, 
          // newColumnId: source.droppableId, 
          // newTask: draggedTask 
        }))  
        setDraggableData(newBoard)
    }






    // const taskList = Array.from(sourceColumn.tasks)
    // const [movedTask] = taskList.splice(source.index, 1)
    // taskList.splice(destination.index, 0, movedTask)
    // const updatedColumns = [...board.columns]
    // updatedColumns[source.droppableId] = {...sourceColumn, tasks: taskList} 
    // const updatedBoard = {...board, columns : updatedColumns}
    // console.log('updated', updatedBoard) 
    // setDraggableData(updatedBoard)
    // dispatch(boardsSlice.actions.dragTask({colIndex: destination.index, prevColIndex: source.index , taskIndex: taskList }))
 



   
  



  }
  
console.log(createBoardMenu)

  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      id="wrapper"
      className="relative max-w-[1920px] mx-auto font-roboto overflow-y-hidden dark:bg-darkbackground"
    >
      {/* header menu */}
      <Nav
        boardMenu={boardMenu}
        setBoardMenu={setBoardMenu}
        setNewTaskMenu={setNewTaskMenu}
        ellipsesMenu={ellipsesMenu}
        setElippsesMenu={setElippsesMenu}
        setTaskMode={setTaskMode}
      />

      {/* Main content rendered inside scroll container*/}
      <ScrollContainer
        nativeMobileScroll={true}
        vertical={false}
        horizontal={true}
        hideScrollbars={false}
        ignoreElements={".card"}
        className="Main flex w-screen overflow-auto relative"
      >
        {/* side menu */}
        <Sidebar
          setSideNavOpen={setSideNavOpen}
          sideNavOpen={sideNavOpen}
          setBoardMenu={setBoardMenu}
          setBoardMode={setBoardMode}
          setCreateBoardMenu={setCreateBoardMenu}
        />

        <main
          className={`${
            sideNavOpen
              ? "dk:left-[18.75rem] tb:left-[16.25rem] transition-all duration-500 "
              : "left-[0]"
          } tb:absolute static transition-all duration-500 p-[1rem] dk:p-[1.5rem] cursor-move flex  w-full h-screen bg-lghtbackground dark:bg-darkbackground`}
        >
          {/* {boards.length < 1 ? (
            <EmptyBoard
              setCreateBoardMenu={setCreateBoardMenu}
              setBoardMenu={setBoardMenu}
              setBoardMode={setBoardMode}
            />
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              {draggableData?.columns.map((column, index) => (
                <Column
                  key={index}
                  columnIndex={index}
                  column={column}
                  setTaskModalOpen={setTaskModalOpen}
                  setTaskTaskIndex={setTaskTaskIndex}
                  setTaskColumnIndex={setTaskColumnIndex}
                />
              ))} */}

              {/* {draggableData?.columns.length > 4 ? (
                ""
              ) : (
                <div className=" h-screen flex justify-center items-center font-bold  transition duration-300 cursor-pointer w-[280px] rounded border-dashed border-2 dark:border-darksecondary ">
                  <button
                    className="bg-lghtsecondary px-4 py-2 shadow-md dark:bg-drksecondary-800  hover:dark:bg-drksecondary-900"
                    onClick={() => {
                      setCreateBoardMenu(true)
                      setBoardMode('edit')
                    }}
                  >
                    <AddIcon fontSize="small" /> New Column
                  </button>
                </div>
              )}
            </DragDropContext>
          )} */}

        </main>
      </ScrollContainer>

      {/* MODALS */}

      {/* mobile nav menu */}
      {/* {boardMenu ? (
        <BoardsMenuModal
          setBoardMenu={setBoardMenu}
          setCreateBoardMenu={setCreateBoardMenu}
          setBoardMode={setBoardMode}
        />
      ) : (
        ""
      )} */}

      {/* create new board or edit the active board  */}
      {createBoardMenu ? (
        <AddBoardModal
          setCreateBoardMenu={setCreateBoardMenu}
          type={type}
          setBoardMode={setBoardMode}
        />
      ) : (
        ""
      )}

      {/* create a new task for active board or edit an exisiting task */}
      {/* {newTaskMenu ? (
        <AddEditTaskModal
          setNewTaskMenu={setNewTaskMenu}
          type={taskType}
          newTaskMenu={newTaskMenu}
          columnIndex={taskColumnIndex}
          taskIndex={taskTaskIndex}
        />
      ) : (
        ""
      )} */}

      {/* nav - edit or delete board menu */}
      {/* {ellipsesMenu ? (
        <DeleteEditMenuModal
          setElippsesMenu={setElippsesMenu}
          setBoardMode={setBoardMode}
          setCreateBoardMenu={setCreateBoardMenu}
          setDeleteBoardModal={setDeleteBoardModal}
          setDeleteMode={setDeleteMode}
        />
      ) : (
        ""
      )} */}
      {/* are you sure modal... delete active board or delete a task on active board*/}
      {/* {deleteBoardModal ? (
        <DeleteBoardAndTaskModal
          setDeleteBoardModal={setDeleteBoardModal}
          deleteMode={deleteMode}
          boardName={board.name}
          columnIndex={taskColumnIndex}
          taskIndex={taskTaskIndex}
        />
      ) : (
        ""
      )} */}
      {/* opens when task card clicked */}
      {/* {taskModalOpen && (
        <TaskModal
          columnIndex={taskColumnIndex}
          taskIndex={taskTaskIndex}
          setTaskModalOpen={setTaskModalOpen}
          taskModalOpen={taskModalOpen}
          setNewTaskMenu={setNewTaskMenu}
          setTaskMode={setTaskMode}
          setDeleteMode={setDeleteMode}
          setDeleteBoardModal={setDeleteBoardModal}
        />
      )} */}
    </div>
  );
}

export default App;
