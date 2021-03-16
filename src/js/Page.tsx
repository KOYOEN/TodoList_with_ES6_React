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
  completed: boolean,
  editing: boolean
}

interface Count {
  active: number,
  completed: number,
  total: number
}

export interface Props {
  todoList?: JSX.Element[],
  currentPage?: string,
  count?: Count,
  isCheckedToggleAll?: boolean,
  handleKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void,
  handleChange?(event: React.ChangeEvent<HTMLInputElement>): void,
  handleOnClick?(event: React.MouseEvent<HTMLElement>): void,
  handleOnDbClick?(event: React.MouseEvent<HTMLLabelElement>): void,
  handleDelete?(event: React.MouseEvent<HTMLButtonElement>): void,
}

interface State {
  todoList?: JSX.Element[],
  currentPage?: string,
  count: Count,
  isCheckedToggleAll?: boolean,
}

const addTodo = (title: string) => {
  title = title || "";

  const newItem:Item = {
    id : new Date().getTime(),
    title: title,
    completed: false,
    editing: false
  }
  save(newItem);
}

const updateTodo = (id: number, title: string) => {
  title = title || "";

  let updateItem: Item = find(id);
  updateItem.title = title;
  updateItem.editing = false;

  save(updateItem);
}

const deleteTodo = (id: number) => {
  const dataList = findAll();
  const itemIdx = dataList.findIndex((item: Item) => item.id == id);
  if(itemIdx === -1){
    return;
  }
  dataList.splice(itemIdx, 1);

  localStorage.setItem(enumList.dbName, JSON.stringify(dataList));
}

const find = (id: number) => {
  const todos = JSON.parse(localStorage.getItem(enumList.dbName));
  return todos.filter((item: Item) => item.id === id )[0];
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


const _getItemId = (element: HTMLElement) => {
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

const getCount = () => {
  const dataList = findAll();
  const count = {
    active: 0,
    completed: 0,
    total: 0
  };

  dataList.forEach((item: Item) => {
    if(item.completed){
      count.completed++;
    }else {
      count.active++;
    }
    count.total++;
  });


  return count;
}

const getToggleAllStatus = (count: Count) => {
  //toggle-all 체크박스를 동기화해주는 값을 반환하는 함수
  if(count.total !== 0 && count.total === count.completed){
    return true;
  }else {
    return false;
  }
}


class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const location = _getLocation();
    const data = findAll();

    if (!localStorage.getItem(enumList.dbName)) {
      localStorage.setItem(enumList.dbName, JSON.stringify([]));
    }

    const cnt = getCount();
    if (location === 'all') {
      this.state = {
        todoList: this.showEntries(data),
        currentPage: location,
        count: cnt
      }
    } else {
      const isCompleted = location === 'completed';
      this.state = {
        todoList: this.showEntries(
          data.filter(({completed}: Item) => completed === isCompleted)
        ),
        currentPage: location,
        count: cnt,
        isCheckedToggleAll: getToggleAllStatus(cnt)
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnDbClick = this.handleOnDbClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
      let editing = '';
      if (item.completed) {
        completed = 'completed';
      }
      if (item.editing) {
        editing = 'editing';
      }
      return (
        <li key={item.id} data-id={item.id} className={completed + editing}>
          <div className="view">
            <input type="checkbox" className="toggle" onChange={this.handleChange} checked={item.completed}/>
            <label onDoubleClick={this.handleOnDbClick}>{item.title}</label>
            <button className="destroy" onClick={this.handleDelete}/>
          </div>
          <input
            key={item.id}
            data-id={item.id}
            type="text"
            className="edit"
            defaultValue={item.title}
            onKeyPress={this.handleKeyPress}
          />
        </li>
      )
    });
    return ret;
  }

  handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const title = target.value;
    const currentPage = this.state.currentPage;
    if (event.key === 'Enter' && title.trim() !== '') {
      if (target.className === "new-todo") {
        addTodo(title.trim());
        event.currentTarget.value = "";
      }else {
        // edit의 경우
        updateTodo(parseInt(target.dataset.id), title);
      }

      if (currentPage === 'all') {
        this.showAll()
      } else {
        this.show(currentPage)
      }
    }
    const cnt = getCount();
    this.setState({
      count: cnt,
      isCheckedToggleAll: getToggleAllStatus(cnt)
    });

  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let target = event.currentTarget;
    const currentPage = this.state.currentPage;
    if (target.className === 'toggle-all') {
      toggleAllItems(!target.checked);
    } else if (target.className === 'toggle') {
      toggleItem(_getItemId(target))
    }

   const cnt = getCount();
    if (currentPage === 'all') {
      this.showAll()
    } else {
      this.show(currentPage)
    }
    this.setState({
      count: cnt,
      isCheckedToggleAll: getToggleAllStatus(cnt)
    });
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

    const cnt = getCount();
    this.setState({
      currentPage: targetPage,
      count: cnt,
      isCheckedToggleAll: getToggleAllStatus(cnt)
    });
  }

  handleOnDbClick(event: React.MouseEvent<HTMLLabelElement>) {
    const target = event.currentTarget; // label
    const targetId = _getItemId(target);
    const currentPage = this.state.currentPage;
    let targetItem: Item = find(targetId);

    // li의 className에 'editing' 붙여주기
    targetItem.editing = true;
    save(targetItem);
    // todoList로 만들 항목 Array로 만들기
    let dataList:Array<Item> = findAll();
    if (this.state.currentPage !== 'all') {
      const filter:boolean = this.state.currentPage === "completed";
      dataList = dataList.filter(({completed}: Item) => completed === filter);
    }
    if (currentPage === 'all'){
      this.showAll();
    }else {
      this.show(currentPage);
    }
    const cnt = getCount();
    this.setState({
      count: cnt,
      isCheckedToggleAll: getToggleAllStatus(cnt)
    })

  }

  handleDelete(event: React.MouseEvent<HTMLButtonElement>){
    const target = event.currentTarget;
    const currentPage = this.state.currentPage;
    if(target.className === 'destroy'){
      //X 표시로 지우는 경우
      deleteTodo(_getItemId(target));
    }else {
      // Clear completed 버튼으로 지우는 경우
      const dataList = findAll();
      dataList.forEach((item: Item) => {
        if(item.completed === true){
          deleteTodo(item.id);
        }
      });
    }

    if (currentPage === 'all'){
      this.showAll();
    }else {
      this.show(currentPage);
    }

    const cnt = getCount();

    this.setState({
      count: cnt,
      isCheckedToggleAll: getToggleAllStatus(cnt)
    })
  }

  render() {
    const todoList = this.state.todoList;
    const currentPage = this.state.currentPage;
    return (
      <React.Fragment>
        <section className={enumList.sectionClassName}>
          <div>
            <TodoHeader
              handleKeyPress={this.handleKeyPress}
            />
            <TodoMain
              count={this.state.count}
              isCheckedToggleAll={this.state.isCheckedToggleAll}
              todoList={todoList}
              handleChange={this.handleChange}
            />
            <TodoFooter
              count={this.state.count}
              currentPage={currentPage}
              handleOnClick={this.handleOnClick}
              handleDelete={this.handleDelete}
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
      currentPage: location,
      count: getCount()
    })
  }
}

export default Page;