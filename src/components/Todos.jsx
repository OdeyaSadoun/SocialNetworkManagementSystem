import React, { useState, useEffect } from "react";
import { userContext } from "../App";
import { useContext } from "react";
import RestAPI from "../server/RestAPI";

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("");
  const [items, setItems] = useState([]);
  const completedStyle = {
    textDecoration: "line-through",
  };
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await RestAPI.getTodosByUsername(user.username);
      setTasks(tasks);
      setItems(tasks);
    };
    fetchData();
  }, []);

  const refreshTasks = async () => {
    const tasks = await RestAPI.getTodosByUsername(user.username);
    setTasks(tasks);
    setItems(tasks);
  };

  const handleSortingCriteriaChange = (e) => {
    setSortingCriteria(e.target.value);
    sortItems(e.target.value);
  };

  const sortItems = async (criteria) => {
    let sortedItems = [...items];
    switch (criteria) {
      case "not-order":
        sortedItems = sortedItems;
        break;
      case "completed":
        sortedItems = await RestAPI.getCompletedTodosByUsername(user.username);
        break;
      case "not-completed":
        sortedItems = await RestAPI.getIncompleteTodosByUsername(user.username);
        break;
      case "alphabetical":
        sortedItems = await RestAPI.getAlphabeticalTodosByUsername(user.username);
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  const toggleItemCompletion = async (taskId) => {
    const updatedItems = items.map((item) => {
      if (item.id === taskId) {
        const completed = !item.completed;
        RestAPI.updateTodoCompletionStatus(user.username, taskId, completed);
        return { ...item, completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDelete = async (taskId) => {
    await RestAPI.deleteTodoByUsername(user.username, taskId);
    const updatedItems = items.filter((item) => item.id !== taskId);
    setItems(updatedItems);
  };

  const handleEdit = (item) => {
    const newTitle = window.prompt("Enter new task title", item.title);
    if (newTitle && newTitle.trim() !== "") {
      handleTaskTitleChange(item.id, newTitle);
    }
  };

  const handleTaskTitleChange = async (taskId, newTitle) => {
    try {
      await RestAPI.updateTodoTitle(user.username, taskId, newTitle);
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: newTitle };
        }
        return task;
      });
      setTasks(updatedTasks);
      setItems(updatedTasks);
    } catch (error) {
      console.log("Error updating task title:", error);
    }
  };

  const handleAddTask = async () => {
    const newTaskTitle = window.prompt("Enter task title");
    if (newTaskTitle && newTaskTitle.trim() !== "") {
      try {
        await RestAPI.addTodoByUsername(
          user.username,
          user.id,
          newTaskTitle,
          false
        );
        refreshTasks();
      } catch (error) {
        console.log("Error adding task:", error);
      }
    }
  };

  return (
    <div className="checklist">
      <h2>Checklist</h2>
      <div>
        <label htmlFor="sortingCriteria">Sort by: </label>
        <select
          id="sortingCriteria"
          value={sortingCriteria}
          onChange={handleSortingCriteriaChange}
        >
          <option value="not-order">None</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
      <ul style={{ listStyleType: "none" }}>
        {items.map((item) => (
          <li key={item.id} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItemCompletion(item.id)}
              style={{ marginRight: "10px" }}
            />
            <p style={item.completed ? completedStyle : null}>{item.title}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Todos;
