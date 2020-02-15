import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import AddSvg from '../../assets/img/add.svg';


const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
    setEmptyInput(false);
  }

  const handleOnChange = e => {
    setInputValue(e.target.value);
    if (inputValue.length === 0) {
      setEmptyInput(false);
    }
  }

  const addTask = () => {
    if (!inputValue) {
      setEmptyInput(true);
      return;
    } else {
      setEmptyInput(false);
      setIsLoading(true);
      const obj = {
        "listId": list.id,
        "text": inputValue,
        "completed": false
      };
      axios
        .post('http://localhost:3001/tasks', obj)
        .catch(() => {
          alert('Ups, we have some problems. The task will not be added.');
          setIsLoading(false);
        })
        .then(({ data }) => {
          onAddTask(list.id, data);
          toggleFormVisible();
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={AddSvg} alt="Add Icon" />
          <span>New task</span>
        </div>
      ) : (
          <div className="tasks__form-block">
            <input value={inputValue} onChange={handleOnChange} className={classNames("field", { 'empty': emptyInput })} type="text" placeholder="Enter your task" />
            <button disabled={isLoading} onClick={addTask} className="button">{isLoading ? 'Adding..' : 'Add the task'}</button>
            <button onClick={toggleFormVisible} className="button button--grey">Cancel</button>
          </div>
        )}
    </div>
  )
}

export default AddTaskForm;
