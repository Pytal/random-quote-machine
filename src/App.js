import React from 'react';
// import logo from './logo.svg';
import './App.css';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

// export default App;

function Box() {
  return (
    <div id='quote-box'>
      <p id='text'>quote</p>
      <p id='author'></p>
      <button id='new-quote'>New Quote</button>
      <button id='tweet-quote'>Tweet Quote</button>
    </div>
  );
}

export default Box;
