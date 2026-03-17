import { useContext } from "react";
import styles from "./WelcomeMessage.module.css";
import { TodoItemsContext } from "../store/todo-item-store";

const WelcomeMessage = () => {
  const contextObject = useContext(TodoItemsContext);
  const todoItems = contextObject.items;
  return (
    <>
      {todoItems.length === 0 && (
        <p className={styles.inMessage}>Welcome! Let's add some tasks!</p>
      )}
    </>
  );
};

export default WelcomeMessage;
