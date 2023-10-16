import './App.css';
import TodoList from './TodoList'
import {useEffect, useState} from 'react'
import { v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY_TODOLIST = 'todoList'

function App() {

  const [todoList, setTodoList] = useState([]);
  const [name, setName] = useState('')

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOLIST)));
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOLIST, JSON.stringify(todoList))
  }, [todoList])

  function handleAddTodo(event)
  {
    // const copyTodoList = [...todoList];
    // copyTodoList.push({id: uuidv4(), name: name, complete: false});
    // setTodoList(copyTodoList);

    setTodoList(prevTodoList => [...prevTodoList, {id: uuidv4(), name: name, complete: false}])
    setName('');
  }

  function toggleTodo(id)
  {
    const newTodoList = [...todoList];
    const todo = newTodoList.find(x => x.id === id);
    todo.complete = !todo.complete;

    setTodoList(newTodoList);
  }

  function handleChangeName(event)
  {
    setName(event.target.value);
  }

  function handleClearComplete()
  {
    const todosNotCompleted = todoList.filter(x => !x.complete);
    setTodoList(todosNotCompleted);
  }

  return (
    <div className="container">
      <div className="controls">
        <input value={name} type="text" onChange={handleChangeName} />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearComplete} className="clear-btn">Limpar completas</button>
      </div>
      <div className="todo-list-container">                
        <TodoList todoList={todoList} toggleTodo={toggleTodo}/>
      </div>
      <p>{todoList.filter(x => !x.complete).length} tarefa(s) a serem feitas</p>
    </div>
  );
}

export default App;