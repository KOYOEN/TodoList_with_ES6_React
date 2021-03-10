import React from 'react';
import TodoHeader from './todoHeader';
import TodoMain from './todoMain';
import TodoFooter from './todoFooter';

const Index = (props) => {

  return(
    <div>
      <TodoHeader addTodo={props.addTodo} handleKeyPress={props.handleKeyPress}/>
      <TodoMain todoList={props.todoList}/>
      <TodoFooter />
    </div>
  );
}

export default Index;