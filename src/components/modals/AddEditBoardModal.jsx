import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

const AddEditBoardModal = ({ setCreateBoardMenu, type }) => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [createdColumns, setCreatedColumns] = useState([
    {
      name: "Todo",
      task: [],
      id: uuidv4(),
    },
    {
      name: "Doing",
      task: [],
      id: uuidv4(),
    },
  ]);
  console.log(createdColumns);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setCreatedColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setBoardName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!boardName.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setCreatedColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setCreatedColumns((prevState) => prevState.filter((element) => element.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ boardName, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ boardName, newColumns }));
    }
    setCreateBoardMenu(false);
  };

  return (
    <section
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-30 z-10 flex items-center justify-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setCreateBoardMenu(false);
      }}
    >
      <article className="absolute top-[6rem] w-[345px] rounded bg-white shadow-md p-6">
        <h3 className=" text-l mb-[1.5rem]">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        <div className="flex flex-col mb-[1.5rem]">
          <label className="text-sm mb-[.5rem]">Board Name</label>
          <input
            onChange={(e) => setBoardName(e.target.value)}
            className="border text-body-l p-2"
            placeholder="eg. web design"
            id="board-name"
          />
        </div>

        <div>
          <label className="text-sm ">Board Columns</label>
          {createdColumns.map((column, index) => {
            return (
              <div className="flex gap-[1rem] items-center w-full mt-[.5rem] mb-[.75rem]" key={index}>
                <input
                  className="border w-full text-body-l p-2"
                  onChange={(e) => {
                    onChange(column.id, e.target.value);
                  }}
                  type="text"
                  value={column.name}
                />
                <button
                  onClick={() => onDelete(column.id)}
                  className="cursor-pointer"
                >
                  <DeleteForeverOutlinedIcon fontSize="medium" />
                </button>
              </div>
            );
          })}

          <div className="flex flex-col gap-[1.5rem] mt-[1.5rem]">
            <button
              type="button"
              className="border flex items-center justify-center py-2 rounded"
              onClick={() => {
                setCreatedColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              <AddIcon sx={{fontSize: '.75rem'}}/>
              New Column
            </button>

            <button
              className="border py-2 rounded"
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              type="submit"
            >
              {" "}
              {type === "add" ? " Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AddEditBoardModal;
