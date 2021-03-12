import React from 'react';
import {Props} from './index';



class TodoHeader extends React.Component<Props> {
  constructor(props: Props){
    super(props);
  }

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