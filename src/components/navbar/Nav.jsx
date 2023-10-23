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
  // const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const boards = useSelector((state) => state.boards);

  return (
    <header>
      <nav className="Nav Nav__theme">
        <div className="Nav__cont-left">



          {/* Logo section */}

          <div className="Nav__title-logo">
            <ViewKanbanSharpIcon fontSize="large" className='text-lghtprimary'/>
            <h1 className="Nav__h1">
              KANBAN<span className="Nav__h1-span">Marv.Dev</span>
            </h1>
          </div>



          {/* active board name */}

          <div className="Nav__cont-center ">

            <h2 className="Nav__h2 ">
              {boards.length < 1 ? "No Boards" : board.name}
            </h2>

            <button
              className="tb:hidden flex items-center"
              onClick={() => setBoardMenu(!boardMenu)}
            >
              <h2 className="Nav__h2-mobile">
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
          <div className="Nav__cont-right">
            {/* Add a task */}
            <button
              onClick={() => {
                setNewTaskMenu(true);
                setTaskMode("add");
              }}
              className="Nav__btn-theme-main Nav__btn-addtask"
            >
              <AddIcon sx={{ fontSize: "1rem" }} className='dark:text-darktext' />
              <span className="Nav__btn-innertxt">New Task</span>
            </button>

            {/* delete/edit board */}
            <button onClick={() => setElippsesMenu(!ellipsesMenu)} className='Nav__btn-ellip'>
              <MoreVertTwoToneIcon sx={{ fontSize: "2rem" }} className='Nav__theme-txt hover:text-darktext'/>
            </button>
          </div>
        )}

        
      </nav>
    </header>
  );
};

export default Nav;
