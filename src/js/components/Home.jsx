import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const USER = "marinafdez-o";
const API = "https://playground.4geeks.com/todo";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
// Aqui se crea el usuario
  useEffect(() => {
    fetch(API + `/users/${USER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    })
    .finally(() => cargarTareas());
  }, []);
  // Obtenemos las tareas del servidor
  const cargarTareas = () => {
    fetch(API + `/users/${USER}`)
      .then(res => res.json())
      .then(data => Array.isArray(data.todos) ? setTasks(data.todos) : setTasks([]))
      .catch(() => setTasks([]));
  };
  // Agregamos tareaas
  const agregar = () => {
    if (input.trim() === "") return;
    fetch(API + `/todos/${USER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: input, done: false })
    })
    .then(() => {
      setInput("");
      cargarTareas();
    });
  };
  // Borramos tarea
  const borrar = id => {
    fetch(API + `/todos/${id}`, { method: "DELETE" })
      .then(() => cargarTareas());
  };
  // Limpiamos todas las tareas
  const limpiar = () => {
    fetch(API + `/users/${USER}`, { method: "DELETE" })
      .then(() => setTasks([]));
  };
// aqui lo que nos devuelve
  return (
    <div className="container mt-4">
      <h1>Lista de Tareas</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Nueva tarea"
        className="form-control mb-2"
      />
      <button onClick={agregar} className="btn btn-primary me-2">Agregar</button>
      <button onClick={limpiar} className="btn btn-danger">Limpiar todo</button>
      <ul className="mt-3">
        {tasks.length === 0 ? (
          <li>No hay tareas</li>
        ) : (
          tasks.map(t => (
            <li key={t.id} className="d-flex justify-content-between align-items-center">
              {t.label}
              <button onClick={() => borrar(t.id)} className="btn btn-sm btn-outline-danger">:x:</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default Home;