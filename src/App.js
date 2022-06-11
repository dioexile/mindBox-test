import React, { useState, useEffect } from 'react'
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'
import { message } from 'antd';
function App() {
  const [todos, setTodos] = useState([])
  const [completedTodo, setCompletedTodo] = useState(todos)
  const [count, setCount] = useState(0)

  const counter = () => {
    let gr = 0
    completedTodo.forEach((todo) => {
      if (todo.complete === false) {
        gr += 1
      }
    })
    setCount(gr)
  }

  useEffect(() => {
    setCompletedTodo(todos)
    counter()//работает не всегда верно тк счетчик постоянно обнуляется(не знаю как исправить)
  }, [todos])

  const todoFilter = (complete) => {
    if (complete === 'all') {
      setCompletedTodo(todos)
    } else {
      let newTodos = [...todos].filter(item => item.complete === complete)
      setCompletedTodo(newTodos)
    }
  }
  const removeCompleted = () => {
    setTodos([...todos.filter((todo) => todo.complete !== true)])
  }

  const addTask = (userInput) => {
    if (userInput) {
      try {
        todos.forEach(todo => {
          if (userInput === todo.task) {
            throw new Error
          }
        })
        const newItem = {
          id: Math.random().toString(36).substr(2, 9),
          task: userInput,
          complete: false
        }
        setTodos([...todos, newItem])
        message.success('Task added')
      } catch (error) {
        message.error('This task is already exist');
      }
    } else {
      message.error('Empty input');
    }
  }

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
    message.success('Task deleted')

  }

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
      )
    ])
  }

  return (
    <div className="App">
      <header>
        <h1 className='title'>Todos</h1>
      </header>
      <div className="content">
        <ToDoForm addTask={addTask} todos={todos} />
        {completedTodo.map((todo) => {
          return(
            <ToDo
              todo={todo}
              key={todo.id}
              toggleTask={handleToggle}
              removeTask={removeTask}
            />
          )
        })}
        <div className="controls">
          <div className="count"> {count} items left</div>
          <div className="buttons">
            <span onClick={() => todoFilter('all')}>All</span>
            <span onClick={() => todoFilter(false)}>Active</span>
            <span onClick={() => todoFilter(true)}>Completed</span>
          </div>
          <div className="clear">
            <span onClick={() => removeCompleted()}>Clear completed</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
