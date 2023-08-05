import { supabase } from "./db";
import { useEffect, useState } from "react";
import { Database } from "./types";
import "./App.css";
type Todo = Database["public"]["Tables"]["todos"]["Row"];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  function fetchTodo() {
    supabase
      .from("todos")
      .select("*")
      .then((res) => {
        // console.log(res.data);
        setTodos(res.data || []);
      });
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const handleSubmit = () => {
    if (!title) return;
    supabase
      .from("todos")
      .insert([{ title: title }])
      .then((res) => {
        console.log(res);
        fetchTodo();
        setTitle("");
      });
  };

  function handleDelete(todo: Todo) {
    supabase
      .from("todos")
      .delete()
      .eq("id", todo.id)
      .then((res) => {
        console.log(res);
        fetchTodo();
      });
  }

  return (
    <>
      <h1>To Do</h1>

      <input value={title} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>

      <div className="todo-wrapper">
        {todos.map((todo, idx) => {
          const time = new Date(todo.created_at).toLocaleTimeString();
          const date = new Date(todo.created_at).toLocaleDateString();
          return (
            <div key={todo.id} className="todo-item">
              <span>({idx + 1})</span>
              <span>📅{date}</span>
              <span>⏰{time}</span>
              <span>📰{todo.title}</span>
              <span className="trash" onClick={() => handleDelete(todo)}>
                🗑️
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
