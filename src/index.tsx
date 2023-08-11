import ReactDOM from "react-dom/client";
import App from "./App";
import { TodosContextProvider } from "./context/TodosContext";

import "./assets/styles/reset.css";
import "./assets/styles/style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TodosContextProvider>
    <App />
  </TodosContextProvider>
);
