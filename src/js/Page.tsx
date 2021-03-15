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
  save(newItem);
}

const find = (query: Item) => {
  const todos = JSON.parse(localStorage.getItem(enumList.dbName));
  return todos.filter((item: Item) => item.id === query.id );
}

const findAll = () => {
  return JSON.parse(localStorage.getItem(enumList.dbName));
}

const save = (item: Item) => {
  let todos = findAll();
  const itemIdx = todos.findIndex( (element:Item) => element.id === item.id);
  if(itemIdx !== -1){
    // 기존의 것을 수정하는 경우
    todos[itemIdx] = item;
  }else {
    // 새로 삽입하는 경우
    todos.push(item);
  }
 ;

  localStorage.setItem(enumList.dbName, JSON.stringify(todos));
}

const toggleAllItems = (completed: boolean) => {
  const todos = findAll();
  todos.forEach((item:Item) => {
    if(item.completed === completed){
      toggleItem(item.id);
    }
  });
}

const toggleItem = (id: number) => {
  let todos = findAll();
  todos.forEach(( item: Item ) => {
    if (item.id === id){
      item.completed = !item.completed;
      save(item);
      return;
    }
  });
}
const _getItemId = (element: HTMLInputElement) => {
  let li;
  if (element.parentNode.nodeName.toLowerCase() === 'li'){
    li = element.parentElement;
  }else {
    li = element.parentNode.parentElement;
  }

  return parseInt(li.dataset.id, 10);
}

class Page extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);
    if(!localStorage.getItem(enumList.dbName)){
      localStorage.setItem(enumList.dbName, JSON.stringify([]));
    }
    this.state = {
      todoList : this.showAll(),
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    console.log('test', this.state);
  }


  showAll(){
    const todos = findAll();
    console.log('todo', todos);
    console.log('test');
    const todoList = todos.map(({id, title, completed}: Item) => {
      const cname = completed ? "completed" : "";
      const checked = completed;
      return (
        <li className={cname} data-id={id} key={id}>
          <div className="view">
            <input type="checkbox" className="toggle" onChange={this.handleChange} checked={checked}/>
            <label>{title}</label>
            <button className="destroy" />
          </div>
        </li>
      );
    });

    return todoList;
  }

  show(filter: string | boolean){
    const todos = JSON.parse(localStorage.getItem(enumList.dbName));
    const todoList = todos.filter(({completed}: Item) => completed === filter).map(({id, title, completed}: Item) => {
      const cname = completed ? "completed" : "";
      const checked = completed;
      return (
        <li key={id} className={cname}>
          <div className="view">
            <input type="checkbox" className="toggle" onChange={this.handleChange} checked={checked}/>
            <label>{title}</label>
            <button className="destroy" />
          </div>
        </li>
      );
    });

    return todoList;
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
        todoList: this.showAll()
      });
    }
  }

  handleChange (event: React.ChangeEvent<HTMLInputElement>){
    let target = event.currentTarget;
    if(target.className === 'toggle-all'){
      toggleAllItems(!target.checked);
    }else if(target.className === 'toggle'){
      toggleItem(_getItemId(target))
    }

    this.setState({
      todoList: this.showAll()
    });
  }

  render() {
    const todoList = this.state.todoList;
    return(
      <React.Fragment>
        <section className={enumList.sectionClassName} >
          <Todos todoList={todoList} handleKeyPress={this.handleKeyPress} addTodo={addTodo} handleChange={this.handleChange}/>
        </section>
        <Footer />
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.setState({
      todoList: this.showAll()
    });
  }

}

export default Page;