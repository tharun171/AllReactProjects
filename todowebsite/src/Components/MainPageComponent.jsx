import React, { useState } from 'react'
import ToDoItem from './ToDoItem'
// import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const MainPageComponent = (props) => {

    const [show, setShow] = useState(false);
    //To Close Confirm Modal
    const handleClose = () => setShow(false);
    //To Show Confirm Modal
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    //Deleting All ToDo Items
    const deleteAll = () => {
        handleShow();
        localStorage.removeItem("toDosFromLocalStorage");
       //Calling parent's state update function
        props.setToDoItems([]);
        console.log("items length : " + props.ToDoItems.length);
        //closing model after deletion
        handleClose();
    };

    const navigateToAddNewTo = () =>
    {
        navigate("/AddToDo");
    }


    console.log(props.ToDoItems);
    return (
        <div className="container">
            <h3 className="text-center">To Do List</h3>
            <p>Manage your tasks efficiently using the list below.</p>
            <button className="btn btn-success btn-sm my-2 mx-3" onClick={navigateToAddNewTo}>Add New ToDo</button>
            <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete All?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to Delete All the ToDos you Created???</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      No GoBack!
                    </Button>
                    <Button variant="primary" onClick={deleteAll}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


            {
                
                props.ToDoItems.length <= 0 ?
                    (
                        <h5>No ToDos to Display</h5>
                    ) :
                    (
                        <>
                        <button className="btn btn-sm btn-danger mx-3" onClick={handleShow}>Delete All</button>
                        {props.ToDoItems.map((ToDoItemKey) =>
                        (
                            <div key={ToDoItemKey.id}>
                                <ToDoItem key={ToDoItemKey.id} ToDoItem={ToDoItemKey} DeleteFromToDo={props.DeleteFromToDo} />
                            </div>
                        ))}
                        </>
                    )
            }
        </div>
    );
};


export default MainPageComponent