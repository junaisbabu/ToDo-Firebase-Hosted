import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Container, FormControl, Input, InputLabel, Typography } from '@mui/material';
import Todo from './Todo';
import db from './Firebase';
import firebase from 'firebase/compat/app'
import background from './kelly-sikkema-tk9RQCq5eQo-unsplash.jpg'
import { Box } from '@mui/system';

function App() {

  const [todos, setTodos] = useState(['Wake up Early', 'Morning walk'])
  const [input, setInput] = useState('')
  console.log(input)


    // when the app loads, we need to listen to the database and fetch. new todos as they get added / removed
  useEffect(() => {
    // this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map( doc => doc.data()));
      setTodos(snapshot.docs.map( doc => ({ id: doc.id, todo: doc.data().todo}) ))
    })
  }, [])


  const addTodo = event => {
    // this will fire off when we click the button
    event.preventDefault();  // will stop refreshing
    console.log('Im working...');
    // setTodos([...todos, input]);

    db.collection('todos').add({
      todo : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput(''); // clear up the input after clicking Add Todo button
  }

  return (
    <div className="App">
      <Container >
      {/* <img src={background} alt="" /> */}
     <Typography sx={{marginTop:'4rem', marginBottom:'2rem', fontSize:'5rem'}} >ToDo List 🚀</Typography>
     <form>
       <FormControl>
       <InputLabel>
         📝 Write Todo
       </InputLabel>

       <Input value={input} onChange={event => setInput(event.target.value)} />
       </FormControl>
     <Button disabled={!input} variant="contained" size="medium"  type='submit'  onClick={addTodo} >
          Add Todo
        </Button>
        </form>
     <Box>
        {todos.map(todo => (

          <Todo  todo={todo} />

          // <li>{todo}</li>
        ))}
       {/* <li></li>
       <li></li> */}
       </Box>
       </Container>
    </div>
  );
}

export default App;
