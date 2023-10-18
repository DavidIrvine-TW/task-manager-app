import { useState } from "react";
import Nav from "./components/navbar/Nav";
import BoardsMenuModal from "./components/modals/BoardsMenuModal";
import AddEditBoardModal from "./components/modals/AddEditBoardModal";
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

function App() {
  const dispatch = useDispatch();

  const [taskModalOpen, setTaskModalOpen] = useState(false); //regretful prop drilling
  const [taskTaskIndex, setTaskTaskIndex] = useState(null); //regretful prop drilling
  const [taskColumnIndex, setTaskColumnIndex] = useState(null); //regretful prop drilling

  const [boardMenu, setBoardMenu] = useState(false); //mobile sidenav create board modal
  const [createBoardMenu, setCreateBoardMenu] = useState(false); //create new board or edit the active board modal
  const [type, setBoardMode] = useState(""); //add or edit - conditional rendering of cards
  const [taskType, setTaskMode] = useState(""); //add or edit - conditional rendering of cards
  const [newTaskMenu, setNewTaskMenu] = useState(false); //create a new task for active board or edit an exisiting task
  const [ellipsesMenu, setElippsesMenu] = useState(false); //nav - edit or delete board menu
  const [deleteBoardModal, setDeleteBoardModal] = useState(false); //are you sure modal... delete active board or delete a task on active board
  const [sideNavOpen, setSideNavOpen] = useState(true); // is the sidenav open? tb and dk

  const boards = useSelector((state) => state.boards); //all boards
  console.log(boards);
  const board = boards.find((board) => board.isActive === true); //ERROR
  if (!board && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 })); // ensure an active board

  const columns = board?.columns;

  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      id="wrapper"
      className="relative max-w-[1920px] mx-auto font-roboto overflow-y-hidden "
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
        style={{ height: "calc(100vh - 6rem)" }}
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
          // style={{ height: "calc(100vh - 6rem)"}}
          className={`${
            sideNavOpen
              ? "dk:left-[18.75rem] tb:left-[16.25rem] transition-all duration-500 "
              : "left-[0]"
          } tb:absolute static transition-all duration-500 p-[1rem] dk:p-[1.5rem] cursor-move flex  w-full h-screen bg-lghtbackground`}
        >
          {boards.length < 1 ? (
            <EmptyBoard
              setCreateBoardMenu={setCreateBoardMenu}
              setBoardMenu={setBoardMenu}
              setBoardMode={setBoardMode}
            />
          ) : (
            <>
              {columns.map((column, index) => (
                <Column
                  key={index}
                  columnIndex={index}
                  column={column}
                  setTaskModalOpen={setTaskModalOpen}
                  setTaskTaskIndex={setTaskTaskIndex}
                  setTaskColumnIndex={setTaskColumnIndex}
                />
              ))}

              {columns.length > 4 ? (
                ""
              ) : (
                <div className=" h-screen flex justify-center items-center font-bold  transition duration-300 cursor-pointer w-[280px] rounded border-dashed border-2 ">
                  <button
                    className="bg-lghtsecondary px-4 py-2 shadow-md"
                    onClick={() => {
                      setCreateBoardMenu(true)
                      setBoardMode('edit')
                    }}
                  >
                    <AddIcon fontSize="small" /> New Column
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </ScrollContainer>

      {/* ALL MODALS */}

      {/* mobile nav menu */}
      {boardMenu ? (
        <BoardsMenuModal
          setBoardMenu={setBoardMenu}
          setCreateBoardMenu={setCreateBoardMenu}
          setBoardMode={setBoardMode}
        />
      ) : (
        ""
      )}

      {/* create new board or edit the active board  */}
      {createBoardMenu ? (
        <AddEditBoardModal
          setCreateBoardMenu={setCreateBoardMenu}
          type={type}
          setBoardMode={setBoardMode}
        />
      ) : (
        ""
      )}

      {/* create a new task for active board or edit an exisiting task */}
      {newTaskMenu ? (
        <AddEditTaskModal
          setNewTaskMenu={setNewTaskMenu}
          type={taskType}
          newTaskMenu={newTaskMenu}
        />
      ) : (
        ""
      )}

      {/* nav - edit or delete board menu */}
      {ellipsesMenu ? (
        <DeleteEditMenuModal
          setElippsesMenu={setElippsesMenu}
          setBoardMode={setBoardMode}
          setCreateBoardMenu={setCreateBoardMenu}
          setDeleteBoardModal={setDeleteBoardModal}
        />
      ) : (
        ""
      )}
      {/* are you sure modal... delete active board or delete a task on active board*/}
      {deleteBoardModal ? (
        <DeleteBoardAndTaskModal
          setDeleteBoardModal={setDeleteBoardModal}
          boardName={board.name}
        />
      ) : (
        ""
      )}
      {/* opens when task card clicked */}
      {taskModalOpen && (
        <TaskModal
          columnIndex={taskColumnIndex}
          taskIndex={taskTaskIndex}
          setTaskModalOpen={setTaskModalOpen}
          taskModalOpen={taskModalOpen}
        />
      )}
    </div>
  );
}

export default App;
