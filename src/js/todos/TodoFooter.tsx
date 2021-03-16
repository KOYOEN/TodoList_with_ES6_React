import React from 'react';
import {Props} from '../Page';
import {Link} from 'react-router-dom';

const TodoFooter = (props: Props) => {
  return(
    <footer className="footer">
      <span className="todo-count">
        <strong>0</strong>
        <span> </span>
        <span>item</span>
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
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
}

export default TodoFooter;