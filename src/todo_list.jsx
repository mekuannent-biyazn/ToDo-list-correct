import React, { useState } from 'react'
import {BiCheckDouble, BiCheckCircle, BiEdit, BiRefresh, BiReset, BiTrash} from 'react-icons/bi'
import './todo_list.css'
function Todo_list() {
  const[todos, setTodos]=useState([])
  const[inputvalue,setInputValue]=useState('')
  const[editIndex,setEditIndex]=useState(-1)

  const addTodo =()=>{
    if(inputvalue.trim()!==('')){
      if(editIndex!==(-1)){
        const updateTodos=[...todos]
        updateTodos[editIndex]={task: inputvalue, completed: updateTodos[editIndex].completed}
        setTodos(updateTodos)
        setInputValue('')
        setEditIndex(-1)
      }else{
        setTodos([...todos, {task: inputvalue, completed: false}])
        setInputValue('')
      }
    }
  }

  const startEdit = (index) => {
    if (todos[index]) {
      setInputValue(todos[index].task);
      setEditIndex(index);
  }
};


  const cancleEdit=()=>{
    setInputValue('')
    setEditIndex(-1)
  }

  const removeTodo = (index) => {
    const updateTodos = todos.filter((_, i) => i !== index);
    setTodos(updateTodos);
};


  // const toggleCompleted=(index)=>{
  //   const updateTodos=[...todos]
  //   updateTodos[index].completed=!updateTodos[index].completed
  // }
  const toggleCompleted = (index) => {
  const updateTodos = [...todos];
  updateTodos[index].completed = !updateTodos[index].completed;
  setTodos(updateTodos);
};


  return (
    <div className='todo-container'>
      <h1>TO DO LIST</h1>
      <div className='input-section'>
        <input type="text" value={inputvalue} onChange={(e) => setInputValue(e.target.value)} 
        placeholder='Write a new task'
        className='input-field'/>
            {editIndex!== -1 ? (
                <>
                <button onClick={addTodo} className='update-btn'><BiCheckDouble /></button>
                <button onClick={cancleEdit} className='cancle-btn'><BiRefresh/></button>
                </>):(
                <button onClick={addTodo} className='add-btn'>ADD</button>
                )}
      </div>
      <ul className='todo-list'>
        {todos.map((todo,index)=>(
          <li key={index} className={todo.completed ? 'completed':''}>
            {todo.task}
            <div className='btn-group'>
              <button onClick={() => startEdit(index)} className='btn-edit'><BiEdit /></button>
              <button onClick={() => removeTodo(index)} className="btn-remove"><BiTrash /></button>
              <button className="btn-done" onClick={()=> toggleCompleted(index)}>
                {todo.completed ? <BiReset />:<BiCheckCircle />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo_list
