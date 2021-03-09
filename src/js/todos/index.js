import React from 'react';
import TodoHeader from './todoHeader';
import TodoMain from './todoMain';
import TodoFooter from './todoFooter';

const Index = ({dbName}) => {

  return(
    <div>
      <TodoHeader dbName={dbName} />
      <TodoMain dbName={dbName} />
      <TodoFooter />
    </div>
  );
}

export default Index;