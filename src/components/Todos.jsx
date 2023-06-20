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
      setItems(tasks); // Update the items state with the fetched tasks
    };
    fetchData();
  }, []);

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

  const handleSortingCriteriaChange = (e) => {
    setSortingCriteria(e.target.value);
    sortItems(e.target.value);
  };

  const toggleItemCompletion = async (taskId) => {
    // Toggle completion status of an item
    const updatedItems = items.map((item) => {
      if (item.id === taskId) {
        const completed = !item.completed;
        RestAPI.updateTodoCompletionStatus(user.username, taskId, completed); // Update completion status in the server
        return { ...item, completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDelete = async (taskId) => {
    // Delete an item
    await RestAPI.deleteTodoByUsername(user.username, taskId); // Delete the task in the server
    const updatedItems = items.filter((item) => item.id !== taskId);
    setItems(updatedItems);
  };
  const handleEdit = (item) => {
    const newTitle = prompt("Enter the new task title", item.title);
    if (newTitle) {
      updateTaskTitle(item.id, newTitle);
    }
  };
  const updateTaskTitle = async (taskId, newTitle) => {
    try {
      await RestAPI.updateTodoTitle(user.username, taskId, newTitle);
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, title: newTitle };
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
            <p style={item.completed ? completedStyle : null}>{item.title}</p>
            <button onClick={() => handleEdit(item)}>Edit</button> {/* Add edit button */}
            <button onClick={() => handleDelete(item)}>Delete</button> {/* Add delete button */}
          </li>
        ))}

      </ul>
    </div>
  );
};

export default Todos;
