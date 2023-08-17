import { useTodosContext } from "../../context/TodosContext";

interface TodoFilterButtonsProps {
  className?: string;
}

const TodoFilterButtons = ({ className }: TodoFilterButtonsProps) => {
  const { filterStatus, setFilterStatus } = useTodosContext();

  const handleClick = (btnStatus: string) => {
    setFilterStatus(btnStatus);
  };

  return (
    <div className={`filter-buttons ${className}`}>
      <button
        className={`btn btn--filter ${filterStatus === "all" ? "active" : ""}`}
        title="All"
        aria-label="All todos"
        onClick={() => handleClick("all")}
      >
        All
      </button>
      <button
        className={`btn btn--filter ${
          filterStatus === "active" ? "active" : ""
        }`}
        title="Active"
        aria-label="Active todos"
        onClick={() => handleClick("active")}
      >
        Active
      </button>
      <button
        className={`btn btn--filter ${
          filterStatus === "completed" ? "active" : ""
        }`}
        title="Completed"
        aria-label="Completed todos"
        onClick={() => handleClick("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilterButtons;
