import React, { useState, useEffect } from "react";
import { userContext } from "../App";
import { useContext } from "react";
import RestAPI from "../server/RestAPI";

const TaskEditor = ({ taskId, currentTitle, onTitleChange }) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSave = () => {
    onTitleChange(taskId, newTitle);
  };

  return (
    <div>
      <input type="text" value={newTitle} onChange={handleTitleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

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

  const sortItems = (criteria) => {
    let sortedItems = [...items];
    switch (criteria) {
      case "serial":
        sortedItems.sort((a, b) => a.id - b.id);
        break;
      case "completed":
        sortedItems.sort((a, b) => a.completed - b.completed);
        break;
      case "alphabetical":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "random":
        sortedItems.sort(() => Math.random() - 0.5);
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
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, isEditing: true };
        }
        return task;
      })
    );
  };

  const handleTaskTitleChange = async (taskId, newTitle) => {
    try {
      await RestAPI.updateTodoTitle(user.username, taskId, newTitle);
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, title: newTitle, isEditing: false };
          }
          return task;
        })
      );
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === taskId) {
            return { ...item, title: newTitle };
          }
          return item;
        })
      );
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
          <option value="">None</option>
          <option value="serial">Serial</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
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
            {item.isEditing ? (
              <TaskEditor
                taskId={item.id}
                currentTitle={item.title}
                onTitleChange={handleTaskTitleChange}
              />
            ) : (
              <p style={item.completed ? completedStyle : null}>{item.title}</p>
            )}
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
