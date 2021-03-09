import React from 'react'

class TodoHeader extends React.Component {
  constructor(props) {
    super(props);

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
      let todos = JSON.parse(localStorage.getItem(this.props.dbName));
      todos.push(newItem);
      localStorage.setItem(this.props.dbName, JSON.stringify(todos));
      event.target.value = "";
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