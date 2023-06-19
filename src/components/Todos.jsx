import React, { useState, useEffect } from "react";
import { userContext } from "../App";
import { useContext } from "react";
import RestAPI from "../server/RestAPI"

function Todos() {

  const userId = useContext(userContext).id;
  const username = useContext(userContext).username;

  const [items, setItems] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("");

  const fetchTodos = async () => {
    try {
      //const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
      const response = await RestAPI.getTodosByUsername(username);
      console.log("response", response);
      const data = response;
      setItems(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };
  
  useEffect(() => { 
  // Fetch todos when userId changes
    if (userId) {
      fetchTodos();
    }
  }, []);
  
 // Toggle completion status of an item
  const toggleItemCompletion = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

// handles the change event of the sorting criteria select element
  const handleSortingCriteriaChange = (e) => {
    setSortingCriteria(e.target.value);
    sortItems(e.target.value);
  };
  
// Sort items based on the selected criteria
  const sortItems = (criteria) => {
    let sortedItems = [...items];
    switch (criteria) {
      case "serial":
        sortedItems.sort((a, b) => a.id - b.id);
        break;
      case "performance":
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

  const completedStyle = {
    textDecoration: "line-through",
    color: "#5a5a63",
    fontStyle: "italic",
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
          <option value="performance">Performance</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>
      <ul style={{ listStyleType: "none" }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItemCompletion(item.id)}
              style={{ marginRight: "10px" }}
            />
            <p style={item.completed ? completedStyle : null}>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
