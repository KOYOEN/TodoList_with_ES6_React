import React from 'react';
import {Props} from '../Page';
import {Link} from 'react-router-dom';

const TodoFooter = (props: Props) => {
  if(props.count.total == 0){
    return (<></>);
  }
  const clearCompletedButtonValue = props.count.completed > 0 ? 'Clear completed' : '';

  return(
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count.active}</strong>
        <span> </span>
        <span>item{props.count.active > 1 ? 's' : ''}</span>
        <span>&nbsp;left</span>
      </span>
      <ul className="filters">
        <li>
          <Link to="/" className={props.currentPage === "all" ? 'selected' : '' } onClick={props.handleOnClick}>All</Link>
        </li>
        <li>
          <Link to="/active" className={props.currentPage === "active" ? 'selected' : ''} onClick={props.handleOnClick}>Active</Link>
        </li>
        <li>
          <Link to="/completed" className={props.currentPage === "completed" ? 'selected' : ''} onClick={props.handleOnClick}>Completed</Link>
        </li>
      </ul>
      <button className="clear-completed" onClick={props.handleDelete}>{ clearCompletedButtonValue }</button>
    </footer>
  );
}

export default TodoFooter;