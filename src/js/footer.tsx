import React from 'react';

enum Url {
  created = "http://github.com/petehunt/",
  part = "http://todomvc.com",
}

const Footer = () => {
  return(
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Created by &nbsp;
        <a href={Url.created}>petehunt</a>
      </p>
      <p>Part of &nbsp;
        <a href={Url.part}>TodoMVC</a>
      </p>
    </footer>
  );
}

export default Footer;