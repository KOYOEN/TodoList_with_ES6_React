import React from 'react'

class TodoHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyPress={this.props.handleKeyPress} />
      </header>
    );
  }
}

export default TodoHeader;