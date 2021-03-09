import React from 'react';

const TodoMain = (props) => {

  const todos = JSON.parse(localStorage.getItem(props.dbName));
  const todoList = todos.map(({id, title, completed}) => {
    const cname = completed ? "completed" : "";
    return(
      <li key={id} className={cname}>
        <div className="view">
          <input type="checkbox" class="toggle"/>
          <label>{title}</label>
          <button className="destory"></button>
        </div>
      </li>
    );
  });
  return(
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all" />
      <ul className="todo-list">
        {todoList}
      </ul>
    </section>
  );
}

export default TodoMain;
