import React from 'react';
import {Count, Item} from "../Model";

interface TodoMainProps {
  dataList: Item[],
  count?: Count,
  toggleAll: boolean,
  currentPage: string,
  findAll(): Item[],
  find(id: number): Item,
  save(item: Item): void,
  updateTodo(id: number, title: string): void,
  deleteTodo(id: number): void
  getItemId(target: HTMLElement): number,
  toggleAllItems(isChecked: boolean): void,
  toggleItem(id: number): void,
  setDataList(pageName: string): void,
}

class TodoMain extends React.Component<TodoMainProps>{
  constructor(props: TodoMainProps) {
    super(props);

  }
  renderTodoList(){
    if (this.props.count.total <= 0) {
      return null;
    }
    const todoList = this.props.dataList.map((item: Item) => {
      let completed = '';
      let editing = '';
      if (item.completed) {
        completed = 'completed';
      }
      if (item.editing) {
        editing = ' editing';
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
    return (
        <>
          <label htmlFor="toggle-all" />
          <ul className="todo-list">{todoList}</ul>
        </>
    )
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // toggle 및 toggle-all checkbox 구현
    let target = event.currentTarget;
    const currentPage = this.props.currentPage;
    if(target.className === 'toggle-all'){
      this.props.toggleAllItems(!target.checked);
    }else if(target.className === 'toggle'){
      this.props.toggleItem(this.props.getItemId(target))
    }

    this.props.setDataList(this.props.currentPage);
  }

  handleOnDbClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    // 생성된 todo 항목 수정 구현
    const target = event.currentTarget; //label
    const targetId = this.props.getItemId(target);

    let targetItem: Item = this.props.find(targetId);

    //li의 className에 'editing' 붙여주기
    targetItem.editing = true;
    this.props.save(targetItem);

    this.props.setDataList(this.props.currentPage);
  }

  handleDelete = (event: React.MouseEvent<HTMLButtonElement>) =>{
    // X 버튼을 이용한 삭제 구현
    const target = event.currentTarget;
    this.props.deleteTodo(this.props.getItemId(target));
    this.props.setDataList(this.props.currentPage)
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const title = target.value;

    if(event.key === 'Enter' && title.trim() !== ''){
      this.props.updateTodo(parseInt(target.dataset.id), title);
    }

    this.props.setDataList(this.props.currentPage);
  }

  render() {
    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" onChange={this.handleChange}
               checked={this.props.toggleAll}/>
        {this.renderTodoList()}
      </section>
    );
  }
}

export default TodoMain;
