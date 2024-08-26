import React from 'react';
import ReactDOM from 'react-dom/client';
import New from './New';
import Hooks from './Hooks';
import App from './App';
import Login from './Login';
function Show(){
  return <h2>Welcome</h2>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

//<App />
    //<Hooks />
  <>
    <New />
    <Login />
  </>





);

