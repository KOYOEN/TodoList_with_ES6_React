import React from 'react';
import TodoHeader from './todoHeader';
import TodoMain from './todoMain';
import TodoFooter from './todoFooter';



interface Item {
    id: number,
    title: string,
    completed: boolean
}

export interface Props {
    todoList?: Array<Item>,
    handleKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void,
    handleChange?(event: React.ChangeEvent<HTMLInputElement>): void,
    addTodo?(title: string, filter: string | boolean): void,
}


const Index = (props: Props) => {
  return(
    <div>
      <TodoHeader addTodo={props.addTodo} handleKeyPress={props.handleKeyPress} />
      <TodoMain todoList={props.todoList} handleChange={props.handleChange} />
      <TodoFooter />
    </div>
  );
}

export default Index;