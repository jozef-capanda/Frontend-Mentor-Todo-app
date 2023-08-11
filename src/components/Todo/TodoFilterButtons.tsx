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
// const TodoFilterButtons = ({ className }: ITodoFilterButtonsProps) => {
//   const { filterStatus, setFilterStatus } = useTodosContext();

//   const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFilterStatus(e.target.value);
//   };

//   return (
//     <div className={`filter-buttons ${className}`}>
//       <label
//         className={`filter-buttons__label ${
//           filterStatus === "all" ? "active" : ""
//         }`}
//         htmlFor="all"
//         title="All"
//         aria-label="All todos"
//       >
//         <input
//           className="filter-buttons__input"
//           type="radio"
//           name="filters"
//           id="all"
//           value="all"
//           onChange={handleRadioClick}
//         />
//         All
//       </label>
//       <label
//         className={`filter-buttons__label ${
//           filterStatus === "active" ? "active" : ""
//         }`}
//         htmlFor="active"
//         title="Active"
//         aria-label="Active todos"
//       >
//         <input
//           className="filter-buttons__input"
//           type="radio"
//           name="filters"
//           id="active"
//           value="active"
//           onChange={handleRadioClick}
//         />
//         Active
//       </label>
//       <label
//         className={`filter-buttons__label ${
//           filterStatus === "completed" ? "active" : ""
//         }`}
//         htmlFor="completed"
//         title="Completed"
//         aria-label="Completed todos"
//       >
//         <input
//           className="filter-buttons__input"
//           type="radio"
//           name="filters"
//           id="completed"
//           value="completed"
//           onChange={handleRadioClick}
//         />
//         Completed
//       </label>
//     </div>
//   );
// };

export default TodoFilterButtons;
