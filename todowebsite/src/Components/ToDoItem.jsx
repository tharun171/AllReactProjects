import React from 'react'

const ToDoItem = (props) => {
  return (
    <div key={props.ToDoItem} style={{marginBottom:"25px"}}>
        <h5>{props.ToDoItem.id+" "}{props.ToDoItem.title}</h5>
        <p>{props.ToDoItem.desc}</p>
        <button onClick={() =>props.DeleteFromToDo(props.ToDoItem.id)} className="btn btn-danger btn-sm">Delete</button>
        <hr style={{width:"30%"}}/>
    </div>
  )
}

export default ToDoItem