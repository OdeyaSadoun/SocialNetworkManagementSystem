import React, { useState } from "react";

const todosData = [
  {
    id: 1,
    text: "Take out the trash",
    completed: true
  },
  {
    id: 2,
    text: "Grocery shopping",
    completed: false
  },
  {
    id: 3,
    text: "Clean gecko tank",
    completed: false
  },
  {
    id: 4,
    text: "Mow lawn",
    completed: true
  },
  {
    id: 5,
    text: "Catch up on Arrested Development",
    completed: false
  }
];

function Todos() {
  const [items, setItems] = useState(todosData);
  const [sortingCriteria, setSortingCriteria] = useState("");

  const toggleItemCompletion = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
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
      case "performance":
        sortedItems.sort((a, b) => a.completed - b.completed);
        break;
      case "alphabetical":
        sortedItems.sort((a, b) => a.text.localeCompare(b.text));
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
    fontStyle: "italic"
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
        {items.map(item => (
          <li key={item.id} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItemCompletion(item.id)}
              style={{ marginRight: "10px" }}
            />
            <p style={item.completed ? completedStyle : null}>
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
