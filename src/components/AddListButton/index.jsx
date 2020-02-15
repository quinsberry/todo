import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge';

import './AddListButton.scss';
import closeSvg from '../../assets/img/close.svg';

const AddButtonList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
    setEmptyInput(false);
  }
  const handleOnChange = e => {
    setInputValue(e.target.value);
    if (inputValue.length === 0) {
      setEmptyInput(false);
    }
  }

  const addList = () => {
    if (!inputValue) {
      setEmptyInput(true);
      return;
    } else {
      setEmptyInput(false);
      setIsLoading(true);
      axios
        .post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor })
        .then(({ data }) => {
          const color = colors.filter(c => c.id === selectedColor)[0];
          const listObj = { ...data, color, tasks: [] };
          onAdd(listObj);
          onClose();
        })
        .catch(() => {
          alert('Ups, we have some problems. The task will not be added.');
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  }
  const clickingOutside = e => {
    onClose();
    // console.log(clicking);
  }

  return (
    <div className="add-list">
      <List onClick={() => setVisiblePopup(!visiblePopup)} items={[
        {
          className: 'list__add-button',
          icon: (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>),
          name: 'Add list'
        }
      ]} />
      {visiblePopup && <div className="outside" onClick={clickingOutside}></div>}
      {
        visiblePopup &&
        <div className="add-list__popup">
          <img onClick={onClose} src={closeSvg} alt="Close button" className="add-list__popup-close-btn" />
          <input value={inputValue} onChange={handleOnChange} className={classNames("field", { 'empty': emptyInput })} type="text" placeholder="List name" />
          <div className="add-list__popup-colors">
            {
              colors.map(color => <Badge onClick={() => setSelectedColor(color.id)} key={color.id} color={color.name} className={selectedColor === color.id && 'active'} />)
            }
          </div>
          <button onClick={addList} className="button">{isLoading ? 'Adding..' : 'Add'}</button>
        </div>
      }
    </div>
  );
}

export default AddButtonList;
