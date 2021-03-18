import React from 'react';
import Footer from './Footer';
import TodoHeader from "./todos/TodoHeader";
import TodoMain from "./todos/TodoMain";
import TodoFooter from "./todos/TodoFooter";
import {enumList, Item, Count} from "./Model";

interface Props {}

interface State {
  dataList: Item[],
  currentPage?: string,
  count: Count,
  toggleAll: boolean,
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


const getItemId = (element: HTMLElement) => {
  let li;
  if (element.parentNode.nodeName.toLowerCase() === 'li'){
    li = element.parentElement;
  }else {
    li = element.parentNode.parentElement;
  }
  return parseInt(li.dataset.id, 10);
}

const _getPageName = () => {
  const ret = window.location.pathname.split('/')[1];
  return ret === '' ? 'all' : ret;

}

const _getCount = () => {
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


const isToggleAll = (count: Count) => {
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
    const pageName = _getPageName();

    if (!localStorage.getItem(enumList.dbName)) {
      localStorage.setItem(enumList.dbName, JSON.stringify([]));
    }

    const allDataList = findAll();
    const cnt = _getCount();
    if (pageName === 'all'){
      this.state = {
        dataList: allDataList,
        currentPage: pageName,
        count: cnt,
        toggleAll: isToggleAll(cnt)
      };
    }else {
      const isCompleted = pageName === 'completed';
      const updatedDataList = allDataList.filter(({completed}: Item) => completed === isCompleted);
      this.state = {
        dataList: updatedDataList,
        currentPage: pageName,
        count: cnt,
        toggleAll: isToggleAll(cnt)
      };
    }
    this.setDataList = this.setDataList.bind(this);
  }

  setDataList(pageName: string){
    const allDataList = findAll();
    const cnt = _getCount();
    if (pageName === 'all'){
      this.setState({
        dataList: allDataList,
        currentPage: pageName,
        count: cnt,
        toggleAll: isToggleAll(cnt)
      });
    }else {
      const isCompleted = pageName === 'completed';
      const updatedDataList = allDataList.filter(({completed}: Item) => completed === isCompleted);
      this.setState({
        dataList: updatedDataList,
        currentPage: pageName,
        count: cnt,
        toggleAll: isToggleAll(cnt)
      })
    }
  }


  render() {
    return (
      <React.Fragment>
        <section className={enumList.sectionClassName}>
          <div>
            <TodoHeader
              currentPage = {this.state.currentPage}
              addTodo={addTodo}
              updateTodo={updateTodo}
              setDataList={this.setDataList}
            />
            <TodoMain
              dataList={this.state.dataList}
              currentPage={this.state.currentPage}
              count={this.state.count}
              toggleAll={this.state.toggleAll}
              findAll={findAll}
              find={find}
              save={save}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              toggleAllItems={toggleAllItems}
              toggleItem={toggleItem}
              getItemId={getItemId}
              setDataList={this.setDataList}
            />
            <TodoFooter
              dataList={this.state.dataList}
              currentPage={this.state.currentPage}
              count={this.state.count}
              findAll={findAll}
              deleteTodo={deleteTodo}
              setDataList={this.setDataList}
            />
          </div>
        </section>
        <Footer/>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.setDataList(this.state.currentPage);
  }
}

export default Page;