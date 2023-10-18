import ViewKanbanSharpIcon from '@mui/icons-material/ViewKanbanSharp';
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";

const Nav = ({
  boardMenu,
  setBoardMenu,
  setNewTaskMenu,
  setElippsesMenu,
  ellipsesMenu,
  setTaskMode,
}) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const boards = useSelector((state) => state.boards);

  return (
    <header>
      <nav className="fade-in flex items-center min-w-[375px] w-full border-b border-darksecondary bg-lghtsecondary dark:bg-darkbackground">
        <div className="flex flex-row items-center  ">
          {/* Logo section */}
          <div className="tb:w-[260px] dk:w-[300px] items-center flex tb:border-r border-darksecondary p-4 h-[64px] tb:h-[80px] dk:h-[96px] ">
            <ViewKanbanSharpIcon fontSize="large" className='text-lghtprimary'/>
            <h1 className="ml-4 hidden tb:inline-block font-bold text-[1.85rem] tracking-[.3px] text-lghttext dark:text-darktext">
              KANBAN<span className="text-body-sm-mod font-bold">Marv.Dev</span>
            </h1>
          </div>

          {/* active board name */}
          <div className="flex flex-row p-4 dk:px-8">
            <h2 className=" fade-in truncate max-w-[250px] font-bold tb:text-l hidden tb:inline-block dk:text-xl text-lghttext dark:text-darktext">
              {boards.length < 1 ? "No Boards" : board.name}
            </h2>
            <button
              className="tb:hidden flex items-center"
              onClick={() => setBoardMenu(!boardMenu)}
            >
              <h2 className=" fade-in truncate max-w-[200px] font-bold tb:text-l dk:text-xl text-lghttext dark:text-darktext">
                {boards.length < 1 ? "No Boards" : board.name}
              </h2>

              <ArrowDropDownOutlinedIcon
                fontSize="large"
                style={{
                  transition: boardMenu ? "transform 0.3s" : "",
                  transform: boardMenu ? "rotate(180deg)" : "",
                }}
              />

            </button>
          </div>
        </div>

        

        {boards.length < 1 ? (
          ""
        ) : (
          <div className="ml-auto flex flex-row gap-[.5rem] p-4 dk:px-8 dk:gap-[1.5rem] items-center">
            {/* Add a task */}
            <button
              onClick={() => {
                setNewTaskMenu(true);
                setTaskMode("add");
              }}
              className="bg-lghtaccent hover:bg-accent-300 p-2 tb:px-4 tb:py-3  rounded-full tb:rounded flex items-center justify-center shadow-md"
            >
              <AddIcon sx={{ fontSize: "1rem" }} />
              <span className="hidden tb:inline-block text-md text-lghttext">New Task</span>
            </button>

            {/* delete/edit */}
            <button onClick={() => setElippsesMenu(!ellipsesMenu)} className='rounded-lg hover:bg-lghtaccent'>
              <MoreVertTwoToneIcon sx={{ fontSize: "2rem" }} className='text-lghttext hover:text-darktext'/>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
