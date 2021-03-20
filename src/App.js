import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  function onToggleCompleted(id){
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    console.log('Task completion state changed');
    setTasks(updatedTasks);
  }

  function onDeleteTask(id) {
    const remainingTasks = tasks.filter(t => t.id !== id);
    console.log('Task deleted state changed');
    setTasks(remainingTasks);
  }

  function addTask(name){
    const newTask = {id: nanoid(), name: name, completed: false}
    setTasks([...tasks, newTask]);
  }

  function onEditName(id, newName) {
    const editedTasks = tasks.map(task => {
      if(task.id === id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTasks);
  }

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}/>
  ));
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo 
        key={task.id} 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        onToggleCompleted={onToggleCompleted}
        onDeleteTask={onDeleteTask}
        onEditName={onEditName}/>
    ));

  const tasksRemaining = tasks.filter(task => !task.completed).length;
  const headingText = `${tasksRemaining} task${tasksRemaining !== 1 ? 's' : ''} remaining`;
 
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
       {taskList}
      </ul>
    </div>
  );
}

export default App;
