import React from "react";
import ReactDom from "react-dom/client";
import TodoList from "./components/Todo";
import UsersTable from "./components/Table";
import "./index.css";

function App() {
  return <h1>Frontend Assignment</h1>;
}
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <TodoList />
    <div className="spacing" />
    <UsersTable />
  </React.StrictMode>
);
