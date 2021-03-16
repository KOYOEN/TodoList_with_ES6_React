import React from 'react';
import Footer from './Footer';
import TodoHeader from "./todos/TodoHeader";
import TodoMain from "./todos/TodoMain";
import TodoFooter from "./todos/TodoFooter";

enum enumList {
  dbName = "todos-reactjs",
  sectionClassName = "todoapp",
}

interface Item {
  id: number,
  title: string,
  completed: boolean
}
export interface Props {
  todoList?: JSX.Element[],
  currentPage?: string,
  handleKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void,
  handleChange?(event: React.ChangeEvent<HTMLInputElement>): void,
  handleOnClick?(event: React.MouseEvent<HTMLElement>): void,
  addTodo?(title: string, filter: string | boolean): void,
}

interface State {
  todoList?: JSX.Element[],
  currentPage?: string
}

const addTodo = (title: string) => {
  title = title || "";

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

const _getLocation = () => {
  const ret = window.location.pathname.split('/')[1];
  return ret === '' ? 'all' : ret;

}

class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const location = _getLocation();
    const data = findAll();

    if (!localStorage.getItem(enumList.dbName)) {
      localStorage.setItem(enumList.dbName, JSON.stringify([]));
    }

    this.state = {
      currentPage: location
    }

    if (location === 'all') {
      this.state = {
        todoList: this.showEntries(data)
      }
    } else {
      const isCompleted = location === 'completed';
      this.state = {
        todoList: this.showEntries(
          data.filter(({completed}: Item) => completed === isCompleted)
        )
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }


  showAll() {
    const data = findAll();
    this.setState({
      todoList: this.showEntries(data)
    });
  }

  show(filter: string) {
    const todos = JSON.parse(localStorage.getItem(enumList.dbName));
    const isCompleted = filter === 'completed';
    const data = todos.filter(({completed}: Item) => completed === isCompleted);

    this.setState({
      todoList: this.showEntries(data)
    });
  }

  showEntries(data: Array<Item>) {
    // return 만들기기
    const ret = data.map((item: Item) => {
      let completed = '';
      if (item.completed) {
        completed = 'completed';
      }
      return (
        <li key={item.id} data-id={item.id.toString()} className={completed}>
          <div className="view">
            <input type="checkbox" className="toggle" onChange={this.handleChange} checked={item.completed}/>
            <label>{item.title}</label>
            <button className="destroy"/>
          </div>
        </li>
      )
    });
    return ret;
  }

  handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    const title = event.currentTarget.value;
    const currentPage = this.state.currentPage;
    if (event.key === 'Enter' && title.trim() !== '') {
      const newItem = {
        id: new Date().getTime(),
        title: title.trim(),
        completed: false
      }
      let todos = JSON.parse(localStorage.getItem(enumList.dbName));
      todos.push(newItem);
      localStorage.setItem(enumList.dbName, JSON.stringify(todos));
      event.currentTarget.value = "";

      if (currentPage === 'all') {
        this.showAll()
      } else {
        this.show(currentPage)
      }
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let target = event.currentTarget;
    const currentPage = this.state.currentPage;
    if (target.className === 'toggle-all') {
      toggleAllItems(!target.checked);
    } else if (target.className === 'toggle') {
      toggleItem(_getItemId(target))
    }

    if (currentPage === 'all') {
      this.showAll()
    } else {
      this.show(currentPage)
    }
  }

  handleOnClick(event: React.MouseEvent<HTMLElement>) {
    const target = event.currentTarget;
    let targetPage:string = target.getAttribute('href').slice(1);

    if(targetPage === ''){
      targetPage = 'all';
    }

    if (this.state.currentPage === targetPage) {
      return;
    } else if (targetPage === 'all') {
      this.showAll()
    } else {
      this.show(targetPage)
    }
    this.setState({
      currentPage: targetPage
    });
  }

  render() {
    const todoList = this.state.todoList;
    const currentPage = this.state.currentPage;
    return (
      <React.Fragment>
        <section className={enumList.sectionClassName}>
          <div>
            <TodoHeader
              addTodo={addTodo}
              handleKeyPress={this.handleKeyPress}
            />
            <TodoMain
              todoList={todoList}
              handleChange={this.handleChange}
            />
            <TodoFooter
              handleOnClick={this.handleOnClick}
              currentPage={currentPage}
            />
          </div>
        </section>
        <Footer/>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const location: string = _getLocation();
    if (location === 'all') {
      this.showAll()
    } else {
      this.show(location)
    }

    this.setState({
      currentPage: location
    })
  }
}

export default Page;