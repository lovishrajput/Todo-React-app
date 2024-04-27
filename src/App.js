import React, { useState, useRef } from "react";
import "./style.css";

export default function App(){
  const [todos, setTodos] = React.useState([
    {id:1, text:"Wash dishes", done: false},
    {id:2, text: "Do laundry", done: false},
    {id:3, text: "Take shower", done: false}
  ]);


  //initialize nextIdRef to keep track of the ID for the next todo item
  const nextIdRef = useRef(4);//start with ID 4


  return(
    <div className="App">
      <h1>Todo List</h1>
    <TodoList setTodos={setTodos} todos={todos} />
    <AddTodo setTodos={setTodos} nextIdRef={nextIdRef} />
    </div>
  );
}

function TodoList ({todos, setTodos }){
  function handleToggleTodo(todo) {

    const updatedTodos = todos.map((t) =>
    t.id === todo.id 
    ? 
    {
      ...t, 
      done: !t.done
    } 
    :t
    );
    setTodos(updatedTodos);
  }

  if(! todos.length){
    return <p>No todos left!</p>
  }


    return (
      <div className="css-list">
    <ul>
      {todos.map((todo) =>(
      <li 
       onDoubleClick={() => handleToggleTodo(todo)}
      style={{
        textDecoration: todo.done ? "line-through": "" }}
      
      key={todo.id}>{todo.text}
      <DeleteTodo todo ={todo} setTodos={setTodos} />
      </li>

      ))}
    </ul>
    </div>
  )
}



function DeleteTodo({ todo, setTodos}) {

  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
      if (confirmed) {
        setTodos((prevTodos) => {
          return prevTodos.filter((t) => t.id !== todo.id);
        });
      
      }
  }
  return (
    <span 
    onClick={handleDeleteTodo}
    role="button" 
    style={{
      color: "black",
      fontWeight: "bolder",
      marginLeft: 30,
      cursor: "pointer",
      
    }} >X</span>
  )
}



function AddTodo({ setTodos,nextIdRef}){
const inputRef = React.useRef();

  function handleAddTodo(event){
    event.preventDefault();
    const text= event.target.elements.addTodo.value;
      const todo  ={
        id:nextIdRef.current,
        text,
        done: false
      };
      setTodos((prevTodos) =>  prevTodos.concat(todo));

      nextIdRef.current+=1;

      inputRef.current.value = "";
  }

  return (
    <div className="todo-container">
    <form onSubmit={handleAddTodo}>
    <input name="addTodo" placeholder="Add Todo" ref={inputRef} />
    <button type="submit" placeholder="submit">Submit</button>
    </form>
    </div>
  );
}



