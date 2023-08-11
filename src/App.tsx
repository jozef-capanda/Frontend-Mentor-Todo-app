import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/Todo/TodoList";
import Form from "./components/Todo/TodoForm";
import { useTodosContext } from "./context/TodosContext";
import TodoInfo from "./components/Todo/TodoInfo";

const App = () => {
  const { error, isLoading } = useTodosContext();

  return (
    <>
      <Header />

      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <main className="app-container">
          {error ? (
            <p className="message">
              Something went wrong, please try again later!
            </p>
          ) : (
            <>
              <Form />
              <TodoList />
              <TodoInfo />
              <p className="text">Drag and drop to reorder list</p>
            </>
          )}
        </main>
      )}
      <Footer />
    </>
  );
};

export default App;
