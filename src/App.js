import React, { useState,useEffect } from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import Todolist from './Todolist'
import './App.css';
import db from './firebase'
import firebase from 'firebase'; // for timestamp and all

function App() {
  const [todos,setTodos] = useState(['hey','welcome', 'react']);
  const [input,setInput] = useState(''); // for tracking the input field 

  // when the app loads, we need  to listen to the database and fetch  new todos as they get added/removed 
  // basically useEffect loads once when the app loads
  // useEffect(function,dependencies);

  useEffect(()=>{
    // this code fire's up when app.js  loads
    db.collection('todos').orderBy('timestamp',"desc").onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo}))); //here to is in firebase
    })
  },[]);




  const addTodo = (event) =>{
      // this will fireoff when we click botton
    event.preventDefault(); // prevents reloading of page

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

     setTodos([...todos, input]); // this will add elements after the elements already present in the array
     // here 👆 (...) is called spread
     setInput(''); // for clearing text in input field.
     console.log(todos);
  }


  return (
    <div className="App">
      <h1> React Todo App ✅</h1>
        <form>
          <FormControl>
          <InputLabel htmlFor="my-input">✅Add Todo</InputLabel>
          <Input value = {input}  onChange = {event => setInput(event.target.value)} />
          
        </FormControl>
        <Button type = "submit" disabled = {!input} onClick = {addTodo} variant="contained" color="primary">
          Add Todo
          </Button>
        </form>
      

     {/*<form>
        <input value = {input}  onChange = {event => setInput(event.target.value)}/>
          <button type="submit" onClick={addTodo}>Add Todo</button>
        </form> 
        */
     }

      
      
      
      <ul>
          {todos.map(item =>( // jsx loop
            <Todolist name={item}/> // we are fetching the object in line 20
          ))}

          {/*<li>create react app </li>
          <li>react native/ react</li>*/}

      </ul>

    </div>
  );
}

export default App;
