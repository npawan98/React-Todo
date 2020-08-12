import React, { useState } from 'react'
import { ListItem, List, ListItemText, Button, Modal, makeStyles, Input } from '@material-ui/core'
import "./Todo.css";
import db from "./firebase";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  




function Todolist({name}) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    }

    const updateTodo = () => {

        db.collection('todos').doc(name.id).set({
            todo:input

        },{merge: true}); // here merge property is must if we dont give this this will overwrite the present one(state)

        setOpen(false)
    }

    return (
        <>
        <Modal
            open={open}
            onClose={()=>setOpen(false)}
            >
            <div className = {classes.paper}>
            <h1>modal</h1>
            <Input placeholder = {name.todo} defaultValue = {name.todo} value = {input} onChange = {event => setInput(event.target.value)}/>
            <Button disabled = {!input} onClick = {updateTodo}>✅Update Todo</Button>
            </div>
            
        </Modal>
        <div className = "todo">
        {/*<li>{name}</li>*/}
        <List className = "todo__list">
            <ListItem>
            <ListItemText primary = {name.todo} secondary = "deadline⏰"/>
            </ListItem>
            <DeleteForeverIcon onClick = {()=>{db.collection('todos').doc(name.id).delete()}}/>
            <button type="button" onClick={handleOpen}>
                Edit
            </button>
        </List>

            
        </div>
        </>
    )
}
export default Todolist
