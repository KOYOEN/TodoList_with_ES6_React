import React from 'react';

const TodoFooter = () => {
  return(
    <footer className="footer">
      <span className="todo-count">
        <strong>0</strong>
        <span> </span>
        <span>item</span>
        <span>&nbsp;left</span>
      </span>
      <ul className="filters">
        <li><a href="#/" className="selected">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed" >Completed</a></li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
}

export default TodoFooter;