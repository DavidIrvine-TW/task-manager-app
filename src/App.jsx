import { useEffect, useState } from "react";
import { DragDropContext } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from "react-redux";
import { modalIsOpen } from "./redux/modalSlice";
import Nav from "./components/navbar/Nav";
import Sidebar from "./components/navbar/SideNav";
import ScrollContainer from "react-indiana-drag-scroll";
import boardsSlice from "./redux/boardsSlice";
import AllModals from './components/modals/AllModals'
import Column from './components/boards/Column'
import AddIcon from "@mui/icons-material/Add";
import EmptyBoard from "./components/emptyBoard/EmptyBoard"


function App() {

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards?.find((board) => board.isActive === true); 
  if (!board && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 })); // ensure always an active board
  const columns = board?.columns;

  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [draggableData, setDraggableData] = useState(board)

  useEffect(() => {
    setDraggableData(board)
  }, [board, boards])

  const onDragEnd = (result) => {
    const { destination, source } = result;
    // no destination
    if (!destination) {
      return;
    }
    // same column, same index
    if (
      destination.droppableID === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = board.columns.find(
      (index) => index.column_id === source.droppableId
    );
    const destinationColumn = board.columns.find(
      (index) => index.column_id === destination.droppableId
    );
    const draggedTask = sourceColumn.tasks[source.index];

    if (sourceColumn.column_id === destinationColumn.column_id) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [draggedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggedTask);
      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      };
      dispatch(boardsSlice.actions.dragTask({newColumn: newColumn, sourceIndex: source.index, destinationIndex: destination.index, id: sourceColumn.column_id}))
    }

  };
  

  return (

    <div
      style={{ height: "100vh", width: "100vw" }}
      id="wrapper"
      className="relative max-w-[1920px] mx-auto font-roboto overflow-y-hidden dark:bg-darkbackground"
    >
      {/* header menu */}

      <Nav/>

      <AllModals/>

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
        />

        <main
          className={`tb:absolute static transition-all duration-500 p-[1rem] dk:p-[1.5rem] cursor-move flex w-full h-screen bg-lghtbackground dark:bg-darkbackground
          ${sideNavOpen ? "dk:left-[18.75rem] tb:left-[16.25rem] transition-all duration-500 " : "left-[0]"}`}
        >
          {boards.length < 1 ? (

            <EmptyBoard/>

          ) : (

            <DragDropContext onDragEnd={onDragEnd}>

              {columns?.map((column, index) => (
                <Column
                  key={index}
                  columnIndex={index}
                  column={column}
                />
              ))}

              {columns.length > 4 ? (
                ""
              ) : (

                <div className=" h-screen flex justify-center items-center font-bold  transition duration-300 cursor-pointer w-[280px] 
                  rounded border-dashed border-2 dark:border-darksecondary "
                  >

                  <button
                    className="bg-lghtsecondary px-4 py-2 shadow-md dark:bg-drksecondary-800  hover:dark:bg-drksecondary-900"
                    onClick={() => {
                      dispatch(modalIsOpen({type: "editBoard", modalDetail: {type: "edit"}}))
                    }}
                  >
                    <AddIcon fontSize="small" /> New Column
                  </button>

                </div>
                
              )}
              
            </DragDropContext>
          )}

        </main>

      </ScrollContainer>   
      
    </div>
  );
}

export default App;
