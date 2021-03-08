import React from 'react';
import ReactDOM from 'react-dom';

const _dbname = "todos-reactjs";

const Header = (props) => {
    return (
      <header className="header">
        <h1>todos</h1>
        <input type="text" className="new-todo" placeholder="What needs to be done?" onChange={props.onChange}/>
      </header>
    );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    if(!localStorage.getItem(_dbname)){
      this.state.storage = localStorage.setItem(_dbname, JSON.stringify([]));
    }

  }
  handleChange(event){
    const title = event.target.value;
    if (title.trim() === ''){
      return;
    }

    const newItem = {
      title: title.trim(),
      completed: false
    }

    this.setState({

    })
  }
  render() {
    return (
      <div>
        <Header onChange/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.todoapp')
);
