import React from 'react';


const url = {
  created: "http://github.com/petehunt/",
  part: "http://todomvc.com",
}

const Footer = ({className}) => {
  return(
    <footer className={className}>
      <p>Double-click to edit a todo</p>
      <p>Created by &nbsp;
        <a href={url.created}>petehunt</a>
      </p>
      <p>Part of &nbsp;
        <a href={url.part}>TodoMVC</a>
      </p>
    </footer>
  );
}


export default Footer;