import { createContext } from "react";
import { useReducer } from "react";

export const TodoItemsContext = createContext({
  items: [],
  addNewItem: () => {},
  deleteItem: () => {},
});

// pure function
const todoItemsReducer = (currentTodoItemsState, action) => {
  let newTodoItems = currentTodoItemsState;
  if (action.type === "NEW_ITEM") {
    newTodoItems = [
      ...currentTodoItemsState,
      { name: action.payload.itemName, dueDate: action.payload.itemDueDate },
    ];
  } else if (action.type === "DELETE_ITEM") {
    newTodoItems = currentTodoItemsState.filter(
      (item) => item.name !== action.payload.itemName
    );
  }
  return newTodoItems;
};

const TodoItemsContextProvider = ({ children }) => {
  const [newTodoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  const addNewItem = (itemName, itemDueDate) => {
    const newItemAction = {
      type: "NEW_ITEM",
      payload: {
        itemName,
        itemDueDate,
      },
    };
    dispatchTodoItems(newItemAction);
  };

  const deleteItem = (todoItemName) => {
    const deleteItemAction = {
      type: "DELETE_ITEM",
      payload: {
        itemName: todoItemName,
      },
    };
    dispatchTodoItems(deleteItemAction);
  };
  return (
    <TodoItemsContext.Provider
      value={{
        items: newTodoItems,
        addNewItem,
        deleteItem,
      }}
    >
      {/*methods are first class object*/}
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
