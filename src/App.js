import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let myList = localStorage.getItem("list");
  if (myList) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      //set alert
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Item Edited");
    } else {
      showAlert(true, "success", "Your Value is Added Successfuly");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }

    console.log("Hello");
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "List Have No Item");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <nav className="nav-bar">
        <h2>Grocery List App</h2>
      </nav>

      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <h3>Grocery List App</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. Sugar"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-btn" type="submit">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>

        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button onClick={clearList} className="clear-btn">
            Clear Item
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
