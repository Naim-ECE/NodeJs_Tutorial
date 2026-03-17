import "./App.css";
import Container from "./components/Container";
import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import TodoItemsContextProvider from "./store/todo-item-store";

function App() {
  return (
    <>
      <TodoItemsContextProvider>
        <center>
          <AppName />
          <Container>
            <AddTodo />
            <WelcomeMessage />
            <TodoItems />
          </Container>
        </center>
      </TodoItemsContextProvider>
    </>
  );
}

export default App;
