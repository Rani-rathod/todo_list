
"use client"
import React, { useState } from 'react';
import FilteredList from './dropD.js';
import TimeInput from './Time.js';


const App = () => {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("1");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo, done: false, priority, time }, ...todos]);
        setTodo("");
        setPriority("1");
        setTime("");
    }
  };

  const done = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos(delTodo);
  };

  const handleTimeChange = (id, newTime) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, time: newTime } : t
      )
    );
  };

  const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);

  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Todo List</h1>
          <form className="todoForm" onSubmit={handleSubmit}>
          
            <input
              type="text"
              placeholder="Enter a Task..."
              className="text-input"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <select
              className="dropdwon"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
            
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            
            <button type="submit">Add</button>
          </form>
          <FilteredList />
          <table className="data-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Task</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {sortedTodos.map((t) => (
                <tr key={t.id}>
                  <td>{t.priority}</td>
                  <td>{t.todo}</td>
                  <td>{t.time}</td>
                  <td>
                    <button onClick={() => done(t.id)}>
                      {t.done ? 'Not done' : 'Done'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
      </div>
    </>
  );
};
export default App;








