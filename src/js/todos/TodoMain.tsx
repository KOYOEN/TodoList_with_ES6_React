import React from 'react';
import { Props } from '../Page';

const TodoMain = (props: Props) => {
  const label = props.count.total > 0 ? <label htmlFor="toggle-all" /> : <></>;
  const ul = props.count.total > 0 ? <ul className="todo-list">{props.todoList}</ul> : <></>;


  return(
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" onChange={props.handleChange} checked={props.isCheckedToggleAll}/>
      {label}
      {ul}
    </section>
  );
}

export default TodoMain;
