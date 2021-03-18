import React from 'react';
import {Link} from 'react-router-dom';
import {Count, Item} from "../Model";

interface TodoFooterProps {
  dataList: Item[],
  count: Count,
  currentPage: string,
  findAll(): Item[],
  deleteTodo(id: number): void,
  setDataList(pageName: string): void,
}


class TodoFooter extends React.Component<TodoFooterProps> {
  constructor(props: TodoFooterProps) {
    super(props);
  }

  handleOnClick = (event: React.MouseEvent<HTMLElement>) =>{
    const target = event.currentTarget;
    let targetPage: string = target.getAttribute('href').slice(1);

    targetPage = targetPage === '' ? 'all' : targetPage;

    if(this.props.currentPage === targetPage){
      return;
    }else {
      this.props.setDataList(targetPage);
    }
  }

  handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const allDataList = this.props.findAll();
    allDataList.forEach((item: Item) => {
      if(item.completed === true){
        this.props.deleteTodo(item.id);
      }
    });
    this.props.setDataList(this.props.currentPage);
  }

  render() {
    const clearCompletedButtonValue = this.props.count.completed > 0 ? 'Clear completed' : '';

    if (this.props.count.total === 0){
      return null;
    }

    return (
      <footer className="footer">
      <span className="todo-count">
        <strong>{this.props.count.active}</strong>
        <span> </span>
        <span>item{this.props.count.active > 1 ? 's' : ''}</span>
        <span>&nbsp;left</span>
      </span>
        <ul className="filters">
          <li>
            <Link to="/" className={this.props.currentPage === "all" ? 'selected' : ''}
                  onClick={this.handleOnClick}>All</Link>
          </li>
          <li>
            <Link to="/active" className={this.props.currentPage === "active" ? 'selected' : ''}
                  onClick={this.handleOnClick}>Active</Link>
          </li>
          <li>
            <Link to="/completed" className={this.props.currentPage === "completed" ? 'selected' : ''}
                  onClick={this.handleOnClick}>Completed</Link>
          </li>
        </ul>
        <button className="clear-completed" onClick={this.handleDelete}>{clearCompletedButtonValue}</button>
      </footer>
    );
  }
}

export default TodoFooter;