import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Backend URL (Kubernetes backend service name: "backend")
  const API_URL = "http://backend:5000";

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;

    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-section">
        <input 
          type="text"
          value={title}
          placeholder="Enter todo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTodo(t._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

