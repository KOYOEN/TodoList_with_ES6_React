import React from 'react';
import TodoHeader from './todos/todoHeader';
import Todos from './todos/index';
import Footer from './footer';

enum enumList {
  dbName = "todos-reactjs",
  sectionClassName = "todoapp",
}

interface Item {
  id: number,
  title: string,
  completed: boolean
}
interface Props { }
interface State {
  todoList?: Array<Item>
}

const addTodo = (title: string, filter: string | boolean) => {
  title = title || "";
  filter = filter || "All";
  let newItem:Item = {
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


const store = (item: Item) => {
  let todos = JSON.parse(localStorage.getItem(enumList.dbName));

  const itemIdx = todos.findIndex(( element: Item ) => element.id === item.id);
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
  const todoList = todos.map(({id, title, completed}: Item) => {
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

const show = (filter: string | boolean) => {
  const todos = JSON.parse(localStorage.getItem(enumList.dbName));
  const todoList = todos.filter(({completed}: Item) => completed === filter).map(({id, title, completed}: Item) => {
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


class Page extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);
    if(!localStorage.getItem(enumList.dbName)){
      localStorage.setItem(enumList.dbName, JSON.stringify([]));
    }
    this.state = {
      todoList : showAll(),
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>){
    const title = event.currentTarget.value;
    if (event.key === 'Enter' && title.trim() !== ''){
      const newItem = {
        id: new Date().getTime(),
        title: title.trim(),
        completed: false
      }
      let todos = JSON.parse(localStorage.getItem(enumList.dbName));
      todos.push(newItem);
      localStorage.setItem(enumList.dbName, JSON.stringify(todos));
      event.currentTarget.value = "";

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
          <Todos todoList={todoList} handleKeyPress={this.handleKeyPress} addTodo={addTodo} />
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;