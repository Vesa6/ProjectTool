import React from 'react';
import Mainpage from './components/Mainpage';
import './main.css';

// Put whatever you want to render when the app opens inside this div.
const app = () => {
  return (
    <div className="App">
      <Mainpage />
    </div>
  );
};

export default app;
