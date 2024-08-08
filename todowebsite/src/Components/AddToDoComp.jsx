import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const AddToDoComp = (props) => {

  const navigate = useNavigate();
  //Data
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  //For giving alerts
  const [titleAlert, setTitleAlert] = useState(false);
  const [descAlert, setDescAlert] = useState(false);

  const submitMethod = (eve) => {
    //Preventing default event
    eve.preventDefault();
    if(title.length === 0){setTitleAlert(true);}
    if(desc.length === 0){setDescAlert(true);}
    if (title.length > 0 && desc.length > 0) {
      console.log("Add ToDo submit clicked");
      console.log("title: " + title + " desc: " + desc);
      //sending this data to App.js - AddToDO is keyName
      props.AddToDo(title, desc);
      setTitle("");
      setDesc("");
      //Sending user to main Page
      navigate("/");
    }
  };

  const goToMainPage = () =>
  {
    console.log("close clicked on AddToDo Page")
    navigate("/");
  }

  return (
    <div className="container my-3">
      <h4 className="text-center">Add To Do Item</h4>
      <form onSubmit={submitMethod}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">ToDo Title</label>
          <input type="text" value={title} onChange=
          {
            (eve) => {setTitle(eve.target.value);
            setTitleAlert(eve.target.value.length>0 ? false : true);}
          } className="form-control" id="titile" />
          {
            titleAlert ?
              <Alert className="my-3" key="danger" variant="danger">Title cant be empty</Alert> : ""
          }
          {/* <div id="emailHelp" className="htmlForm-text">We'll never share your email with anyone else.</div> */}
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">ToDo Description</label>
            <input type="text" value={desc} onChange={
              (eve) => {
                setDesc(eve.target.value)
                setDescAlert(eve.target.value.length>0 ? false : true)}
              } className="form-control" id="description"/>
            {
              descAlert ?
                <Alert className="my-3" key="danger" variant="danger">Description cant be empty</Alert> : ""
            }
          </div>
          {/* <div className="mb-3 htmlForm-check">
                    <inpu type="checkbox" className="htmlForm-check-input" id="exampleCheck1"/>
                        <label className="htmlForm-check-label" htmlhtmlFor="exampleCheck1">Check me out</label>
                </div> */}
        </div>
        <button type="submit" className="btn btn-sm btn-success">Submit</button>
        <button className="btn btn-sm btn-primary mx-4" onClick={goToMainPage}>Close</button>
      </form>
    </div>
  )
}

export default AddToDoComp