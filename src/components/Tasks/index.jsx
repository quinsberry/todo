import React from 'react';
import axios from 'axios';

import Task from './Task';
import AddTaskForm from './AddTaskForm';

import './Tasks.scss';
import editSvg from '../../assets/img/edit.svg';

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt('The name of you list', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle
        })
        .catch(() => {
          alert('Ups, we have some problems. The changes will not be saved.');
        })
    }
  }
  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="Edit Icon" />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>You have no tasks</h2>}
        {list.tasks && list.tasks.map(task => (
          <Task key={task.id} list={list} onEdit={onEditTask} onRemove={onRemoveTask} {...task} />
        ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  )
}

export default Tasks;
