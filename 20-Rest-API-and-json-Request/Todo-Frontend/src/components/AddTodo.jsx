import { useContext, useRef, useState } from "react";
import styles from "./AddTodo.module.css";
import { MdAddToPhotos } from "react-icons/md";
import { TodoItemsContext } from "../store/todo-item-store";

function AddTodo() {
  const {addNewItem} = useContext(TodoItemsContext);
  const todoNameElement = useRef("");
  const todoDateElement = useRef("");

  const handleOnClick = () => {
    const todoName = todoNameElement.current.value;
    const todoDate = todoDateElement.current.value;
    addNewItem(todoName, todoDate);
    todoNameElement.current.value = "";
    todoDateElement.current.value = "";
  };

  return (
    <>
      <div className="container">
        <div className={`row ${styles["gap-row"]}`}>
          <div className="col-4 d-flex justify-content-end">
            <input
              type="text"
              placeholder="Enter Todo Here"
              className={`${styles["todo-input"]}`}
              ref={todoNameElement}
            />
          </div>
          <div className="col-4  d-flex justify-content-end">
            <input
              type="date"
              className={`${styles["todo-calendar"]}`}
              ref={todoDateElement}
            />
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button
              type="button"
              className={`btn btn-success ${styles["kg-button"]}`}
              onClick={handleOnClick}
            >
              <MdAddToPhotos />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTodo;
