import React from 'react';
import TodoHeader from './todos/todoHeader';
import Todos from './todos/index';
import Footer from './footer';

const enumList = {
  dbName: "todos-reactjs",
  sectionClassName: "todoapp",
  footerClassName: "info",
}

const addTodo = (title) => {
  const newItem = {
    id : new Date().getTime(),
    title: title,
    completed: false
  }
  store(newItem);
}

const store = (item) => {
  const {id, title} = item;

  let todos = JSON.parse(localStorage.getItem(enumList.dbName));

  const itemIdx = todos.findIndex(( element ) => element.id === id);
  if(itemIdx !== -1){
    // 기존의 것을 수정하는 경우
    todos[itemIdx] = item;
  }else {
    // 새로 삽입하는 경우
    todos.push(item);
  }
  localStorage.setItem(enumList.dbName, JSON.stringify(todos));
}


class Page extends React.Component {
  constructor(props){
    super(props);
    if(!localStorage.getItem(enumList.dbName)){
      localStorage.setItem(enumList.dbName, JSON.stringify([]));
    }
  }

  render() {
    return [
      <section className={enumList.sectionClassName} >
        <Todos dbName={enumList.dbName}/>
      </section>,
      <Footer className={enumList.footerClassName}/>
    ]
  }
}

export default Page;