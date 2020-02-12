import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import './List.scss';
import removeSvg from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem, all }) => {
  const removeList = (item) => {
    if (window.confirm('Do you want to remove this list?')) {
      axios
        .delete('http://localhost:3001/lists/' + item.id)
        .then(() => {
          onRemove(item.id);
        });
    }
  }
  console.log(items);

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li onClick={onClickItem ? () => onClickItem(item) : null} key={index} className={classNames(item.className, { 'active': activeItem ? activeItem && activeItem.id === item.id : null })}>
          <i>
            {item.icon ? (
              item.icon
            ) : (
                <Badge color={item.color.name} />
              )}
          </i>
          <span>{item.name} {item.tasks && item.tasks.length > 0 && `(${item.tasks.length})`}</span>
          {isRemovable && <img className="list__remove-icon" src={removeSvg} alt="Remove Icon" onClick={() => removeList(item)} />}
        </li>
      ))}
    </ul>
  )
}

export default List;
