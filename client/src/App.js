import React from 'react';
import Mainpage from './components/Mainpage';
import './main.css';

// Client entrypoint.
const app = () => {
  return (
    <div className="App">
      <Mainpage />
    </div>
  );
};

export default app;
