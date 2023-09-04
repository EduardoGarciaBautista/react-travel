import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  const handleAddItems = (newItem) => {
    setItems((currentItems) => [...currentItems, newItem]);
  };

  const deleteItem = (itemToDelete) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemToDelete.id)
    );
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList list={items} onDeleteItems={deleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> Far Away</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description) {
      return;
    }
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSelectChane = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={handleSelectChane}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ list }) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item key={item.description} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li className="item">
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.quantity} {item.description}
      </span>
      <button>❎</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>Yoy have X on your list, and you already packed X (x%)</em>
    </footer>
  );
}
