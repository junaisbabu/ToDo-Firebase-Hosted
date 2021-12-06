import {
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import db from "./Firebase";
import { useState } from "react";
import { Box } from "@mui/system";
import './Todo.css'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#f1f1f1",
};

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateTodo = () => {
    // update the todo with the new input text

    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
  <>
      <Modal open={open} onClose={(event) => setOpen(false)}>
        <Box sx={style}>
          <Typography>Are you sure want to edit?</Typography>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={(event) => setOpen(false)}
          >
            Close
          </Button>
          <Button variant="outlined" size="small" onClick={updateTodo}>
            Update
          </Button>
        </Box>
      </Modal>
      <List sx={{ marginBottom:'3em', marginTop:'2em' }} >
        
        <ListItem className='list-item' sx={{ display:'flex', justifyContent:'center'}} >
          <div className='todo-list' >
        <div>
          <ListItemText className='list-text'
            primary={props.todo.todo}
            secondary="Dummy Deadline ⏰"
          />
          </div>
          <div className='icon-container' >
          
          <EditIcon className='icon' onClick={(event) => setOpen(true)} />
          <DeleteForeverIcon className='icon'
          variant="contained"
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />

        </div>
        </div>
        </ListItem>
        
        
      </List>
    </>

    // <div>
    //     <li> {props.text} </li>
    // </div>
  );
}

export default Todo;
