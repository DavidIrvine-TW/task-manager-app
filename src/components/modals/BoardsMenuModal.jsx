import boardsSlice from "../../redux/boardsSlice";
import { useSelector, useDispatch } from "react-redux";
import BoardIcon from "../icons/boardIcon";
import AddIcon from "@mui/icons-material/Add";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DrkMdSwitch from "../switch/DrkMdSwitch";
import useToggle from "../../hooks/useToggle";
import { useEffect } from "react";

const BoardsMenuModal = ({ setBoardMenu, setCreateBoardMenu, setBoardMode }) => {

  const [isDarkTheme, toggleMode] = useToggle(
    localStorage.getItem("theme-color") === "dark"
  );
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    document.documentElement.className = isDarkTheme ? "dark" : "";
    localStorage.setItem("theme-color", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <section
      id="mobile-board-menu-modal"
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-50 dark:bg-darkbackground dark:bg-opacity-80 z-20  flex items-center justify-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardMenu(false);
      }}
    >
      <article className="w-[265px] rounded bg-lghtbackground text-lghttext  dark:bg-drkbackground-950 shadow-md py-4">

        <h2 className="tracking-[2.4px] text-sm mb-[1rem] px-4 dark:text-darktext">
          ALL BOARDS: {boards?.length}
        </h2>

     
          {boards.map((board, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded ${
                board.isActive
                  ? "bg-lghtaccent text-darktext dark:bg-drksecondary-800 shadow-md "
                  : "hover:bg-secondary-200 hover:dark:bg-drksecondary-900 dark:text-drksecondary-700"
              }`}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({index}))
                setBoardMenu(false)
              }}
            >
              <BoardIcon />
              <p className="text-md">{board.name}</p>
            </button>
          ))}
       

        <div className={`flex items-center space-x-4 px-5 py-4 my-[1rem]  hover:bg-secondary-200 hover:dark:bg-drkprimary-800`}>
          <BoardIcon />
          <button 
            onClick={() => {
              setBoardMenu(false)
              setBoardMode('add')
              setCreateBoardMenu(true)}} 
              className="text-md text-lghtprimary">
                <AddIcon sx={{ fontSize: ".75rem" }} />
                Create New Board
          </button>
        </div>

        <div className="w-[235px] mx-auto  rounded mt-[1rem] flex items-center justify-center">

          <div className="flex rounded items-center justify-between w-full mx-auto p-2 border bg-lghtbackground border-lghtaccent dark:border-darksecondary dark:bg-darkbackground">
            
            <div>
              <LightModeOutlinedIcon className="dark:text-darksecondary"/>
            </div>
            <div>
              <DrkMdSwitch checked={isDarkTheme} toggle={toggleMode} />
            </div>
            <div>
              <DarkModeOutlinedIcon className="dark:text-darksecondary"/>
            </div>

          </div>

        </div>

      </article>
    </section>
  );
};

export default BoardsMenuModal;
