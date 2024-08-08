import "./App.css";
import AboutComp from "./Components/AboutComp";
import AddToDoComp from "./Components/AddToDoComp";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from "./Components/HeaderComponent";
import MainPageComponent from "./Components/MainPageComponent";
import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
//Added Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  //Configuring LOCAL STORAGE so everything wont
  //disappear when we reload website
  let initialToDos;
  
  if (localStorage.getItem("toDosFromLocalStorage") === null) {
    console.log("local " + localStorage.getItem("toDosFromLocalStorage"));
    //Assigning empty array
    initialToDos = [];
  } else {
    console.log("local in else: " + localStorage.getItem("toDosFromLocalStorage"));
    try {
      initialToDos = JSON.parse(localStorage.getItem("toDosFromLocalStorage"));
    } catch (e) {
      initialToDos = [];
    }
  }

  const [ToDoItemsInAppJs, setToDoItems] = useState(initialToDos);

  const onDeleteFromApp = (toDoItemIdPassed) => {
    console.log("deleting id :" + toDoItemIdPassed);
    //Using filter to create a new Array
    //Excluding item to be deleted
    const updatedToDos = ToDoItemsInAppJs.filter(
      (item) => item.id !== toDoItemIdPassed
    );
    console.log("after deleting: " + JSON.stringify(updatedToDos));
    //Updating todos
    setToDoItems(updatedToDos);
    //Setting with localStorage
    localStorage.setItem("toDosFromLocalStorage", JSON.stringify(updatedToDos));
  };

  const addToDoFromApp = (title, description) => {
    console.log(
      "App.js addToDo - title: " + title + " description: " + description
    );
    //if there's nothing in toDoList - everythin is deleted
    //id should start with 1
    console.log("ToDoItemsInAppJs.length "+ToDoItemsInAppJs.length);
    const ToDoId =
      ToDoItemsInAppJs.length > 0
        ? ToDoItemsInAppJs[ToDoItemsInAppJs.length - 1].id + 1
        : 1;
    console.log("ToDoId: "+ToDoId);
    console.log(
      "Adding -> id: " +
        ToDoId +
        " title: " +
        title +
        " description: " +
        description
    );
    //Creating newToDo Block
    const newToDo = {
      id: ToDoId,
      title: title,
      desc: description,
    };
    console.log("Adding -> " + JSON.stringify(newToDo));
    setToDoItems([...ToDoItemsInAppJs, newToDo]);
    console.log("All items "+ToDoItemsInAppJs);
  };

  //Settin with local storage
  //using useEffect = everytime there are changes we refresh this
  useEffect(() => {
    localStorage.setItem("toDosFromLocalStorage", JSON.stringify(ToDoItemsInAppJs));
  }, [ToDoItemsInAppJs]);

  return (
    <>
    {/* <button onClick={deleteAll}>Delete All</button> */}
      <Router>
        <HeaderComponent navBarTitle="ToDo Website" />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <MainPageComponent
                ToDoItems={ToDoItemsInAppJs}
                DeleteFromToDo={onDeleteFromApp}
              />
            }
          />
          <Route
            path="/AddToDo"
            element={<AddToDoComp AddToDo={addToDoFromApp} />}
          />
          <Route path="/About" element={<AboutComp />} />
        </Routes>

        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
