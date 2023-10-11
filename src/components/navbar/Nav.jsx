
import ViewKanbanTwoToneIcon from "@mui/icons-material/ViewKanbanTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import AddIcon from "@mui/icons-material/Add";


const Nav = ({boardMenu, setBoardMenu, setNewTaskMenu, setElippsesMenu, ellipsesMenu }) => {

  

  return (
    <header className=" min-w-[375px] border-b border-black">

      <nav className="flex items-center ">

        <div className="flex flex-row items-center z-[1]">

            {/* Logo section */}
          <div className="tb:w-[260px]  items-center flex tb:border-r border-black p-4 ">
            <ViewKanbanTwoToneIcon fontSize="large" />
            <h1 className="ml-4 hidden tb:inline-block font-bold text-xl">
              KANBAN<span className="text-body-sm-mod font-bold">Marv.Dev</span>
            </h1>
          </div>

            {/* active board name */}
          <div className="flex flex-row p-4 ">
            <h2 className=" truncate max-w-[200px] font-bold tb:text-l hidden tb:inline-block">
              Board Name
            </h2>
            <button
              className="tb:hidden flex items-center"
              onClick={() => setBoardMenu(!boardMenu)}
            >
              <h2 className=" truncate max-w-[200px] font-bold tb:text-l">
                Board Name
              </h2>
              {boardMenu ? (
                <ArrowDropUpOutlinedIcon fontSize="large"/>
              ) : (
                <ArrowDropDownOutlinedIcon fontSize="large"/>
              )}
            </button>
          </div>

        </div>

        <div className="relative ml-auto flex flex-row gap-[.5rem] z-[1] p-4">
           {/* Add a task */}
          <button 
          onClick={
            () => {
              setNewTaskMenu(true)
            }
          }
          className="border border-black px-2 py-1 rounded flex items-center">
            <AddIcon sx={{ fontSize : '1rem'}} />
            <span className="hidden tb:inline-block">New Task</span>
          </button>

            {/* delete/edit */}
          <button
            onClick={() => setElippsesMenu(!ellipsesMenu)}
          >
            <MoreVertTwoToneIcon sx={{ fontSize : '2rem'}}/>
          </button>
         
        </div>

      </nav>
    </header>
  );
};

export default Nav;
