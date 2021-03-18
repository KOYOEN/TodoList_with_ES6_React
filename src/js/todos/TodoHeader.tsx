import React from 'react';

interface TodoHeaderProps {
  currentPage: string,
  addTodo(title: string): void,
  updateTodo(id: number, title: string): void,
  setDataList(pageName: string): void,
}
class TodoHeader extends React.Component<TodoHeaderProps> {
  constructor(props: TodoHeaderProps){
    super(props);

  }
  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const title = target.value;
    if(event.key === 'Enter' && title.trim() !== ''){
      this.props.addTodo(title.trim());
      event.currentTarget.value = "";
      //setState Count 업데이트 해주는 함수
      this.props.setDataList(this.props.currentPage);
    }

  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyPress={this.handleKeyPress} />
      </header>
    );
  }
}

export default TodoHeader;