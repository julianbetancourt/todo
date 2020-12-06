import { useState } from 'react'
import './App.css';

const TODO_STATES = {
  done: "DONE",
  notDone: "NOT_DONE",
}

function App() {
  const [todos, setTodos] = useState([])

  console.log("app")
  function deleteTodo(todoId) {
    const newTodos = todos.filter(t => t.id !== todoId)
    setTodos(newTodos)
  }
  
  function toggleTodoStatus(todoId) {
    const newTodos = todos.map(t => {
      if (t.id === todoId) {
        t.status = t.status === TODO_STATES.done ? TODO_STATES.notDone : TODO_STATES.done
      }
      
      return t
    }) 
    setTodos(newTodos)
  }

  function addTodo(todoName){
    const id = todos.length + 1
    let todo = {id, todo: todoName, status: TODO_STATES.notDone}
    let newTodos = [...todos, todo]
    setTodos(newTodos)
  }

  return (<div>
      <h1>Todo app</h1>
      <CreateTodo addTodo={addTodo} />
      <List actvidad="Besar más a Julian"
       todos={todos}
       deleteTodo={deleteTodo} toggleStatus={toggleTodoStatus}
       />
    </div>
  );
}

function List(props) {
  console.log("list")
  return (
    <ol>
      {props.todos.map(todo => {
        return <><li style={{
          textDecoration: todo.status === TODO_STATES.done ? 'line-through' : 'initial'
        }}
        onClick={(evt) => {
          props.toggleStatus(todo.id)
        }}>
          {todo.todo}
          </li><button onClick={(event) => { props.deleteTodo(todo.id)}}>X</button></>
      })}
    </ol>
  )
}

function CreateTodo(props) {
  const [todoText, setTodoText] = useState("")

  return (
    <><input type="text" onChange={(event) =>{
      setTodoText(event.target.value)
    }} value={todoText} />
    <button onClick={(event) => { 
      props.addTodo(todoText)
      setTodoText("")
    }
    }>Add</button></>
  )
}

export default App