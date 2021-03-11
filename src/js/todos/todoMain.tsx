import React from 'react';
import {Props} from './index';

const TodoMain = (props: Props) => {

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
