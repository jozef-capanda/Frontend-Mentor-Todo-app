import { useTodosContext } from "../../context/TodosContext";
import TodoFilterButtons from "./TodoFilterButtons";

const TodoInfo = () => {
  const { todos, clearCompleted } = useTodosContext();

  const left = todos.filter((todo) => todo.completed === false).length;

  return (
    <>
      <div className="info">
        <div className="info__items-left">
          {left === 1 ? `${left} item left` : `${left} items left`}
        </div>
        <TodoFilterButtons className="filter-buttons--xl" />
        <button
          onClick={() => {
            clearCompleted();
          }}
          type="button"
          className="btn btn--clear"
          title="Clear completed"
          aria-label="Clear completed"
        >
          Clear Completed
        </button>
      </div>
      <TodoFilterButtons />
    </>
  );
};

export default TodoInfo;
