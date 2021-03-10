import React from 'react';
import TodoHeader from './todos/todoHeader';
import Todos from './todos/index';
import Footer from './footer';

const enumList = {
  dbName: "todos-reactjs",
  sectionClassName: "todoapp",
  footerClassName: "info",
}

const addTodo = (title, filter) => {
  title = title || "";
  filter = filter || "All";
  const newItem = {
    id : new Date().getTime(),
    title: title,
    completed: false
  }
  store(newItem);
  if(filter === "All"){
    showAll();
  }else{
    show(filter);
  }
}


const store = (item) => {
  let todos = JSON.parse(localStorage.getItem(enumList.dbName));

  const itemIdx = todos.findIndex(( element ) => element.id === item.id);
  if(itemIdx !== -1){
    // 기존의 것을 수정하는 경우
    todos[itemIdx] = item;
  }else {
    // 새로 삽입하는 경우
    todos.push(item);
  }
  localStorage.setItem(enumList.dbName, JSON.stringify(todos));
}


const showAll = () => {
  const todos = JSON.parse(localStorage.getItem(enumList.dbName));
  const todoList = todos.map(({id, title, completed}) => {
    const cname = completed ? "completed" : "";
    return (
      <li className={cname} key={id}>
        <div className="view">
          <input type="checkbox" className="toggle" />
          <label>{title}</label>
          <button className="destroy" />
        </div>
      </li>
    );
  });

  return todoList;
}

const show = (filter) => {
  const todos = JSON.parse(localStorage.getItem(enumList.dbName));
  const todoList = todos.filter(({completed}) => completed === filter).map(({id, title, completed}) => {
    const cname = completed ? "completed" : "";
    return (
      <li key={id} className={cname}>
        <div className="view">
          <input type="checkbox" className="toggle"/>
          <label>{title}</label>
          <button className="destroy" />
        </div>
      </li>
    );
  });

  return todoList;
}


class Page extends React.Component {
  constructor(props){
    super(props);
    if(!localStorage.getItem(enumList.dbName)){
      localStorage.setItem(enumList.dbName, JSON.stringify([]));
    }
    this.state = {
      todoList: showAll()
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event){
    const title = event.target.value;
    if (event.key === 'Enter' && title.trim() !== ''){
      const newItem = {
        id: new Date().getTime(),
        title: title.trim(),
        completed: false
      }
      let todos = JSON.parse(localStorage.getItem(enumList.dbName));
      todos.push(newItem);
      localStorage.setItem(enumList.dbName, JSON.stringify(todos));
      event.target.value = "";

      this.setState({
        todoList: showAll()
      })
    }
  }

  render() {
    const todoList = this.state.todoList;
    return(
      <React.Fragment>
        <section className={enumList.sectionClassName} >
          <Todos dbName={enumList.dbName} handleKeyPress={this.handleKeyPress} addTodo={addTodo} todoList={todoList}/>
        </section>
        <Footer className={enumList.footerClassName} />
      </React.Fragment>
    );
  }
}

export default Page;