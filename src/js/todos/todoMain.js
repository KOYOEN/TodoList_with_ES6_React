import React from 'react';

const TodoMain = (props) => {

  return(
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all" />
      <ul className="todo-list">
        {props.todoList}
      </ul>
    </section>
  );
}

export default TodoMain;
