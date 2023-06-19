import React, { useState, useEffect } from "react";
import { userContext } from "../App";
import { useContext } from "react";
import RestAPI from "../server/RestAPI"

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("");
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await RestAPI.getTodosByUsername(user.username);
      setTasks(tasks);
    };
    fetchData();
  }, []); // Empty dependency array to run only once

  const sortItems = (criteria) => {
    let sortedItems = [...items];
    switch (criteria) {
      case "serial":
        sortedItems.sort((a, b) => a.id - b.id);
        break;
      case "complited":
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
  };

  
//  // Toggle completion status of an item
//   const toggleItemCompletion = (id) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === id) {
//           return { ...item, completed: !item.completed };
//         }
//         return item;
//       })
//     );
//   };

// handles the change event of the sorting criteria select element
  const handleSortingCriteriaChange = (e) => {
    setSortingCriteria(e.target.value);
    sortItems(e.target.value);
  };
  
// // Sort items based on the selected criteria
//   const sortItems = (criteria) => {
//     let sortedItems = [...items];
//     switch (criteria) {
//       case "serial":
//         sortedItems.sort((a, b) => a.id - b.id);
//         break;
//       case "complited":
//         sortedItems.sort((a, b) => a.completed - b.completed);
//         break;
//       case "alphabetical":
//         sortedItems.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case "random":
//         sortedItems.sort(() => Math.random() - 0.5);
//         break;
//       default:
//         break;
//     }
//     setItems(sortedItems);
//   };

//   const completedStyle = {
//     textDecoration: "line-through",
//     color: "#5a5a63",
//     fontStyle: "italic",
//   };

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
          <option value="complited">Complited</option>
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
