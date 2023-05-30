import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './styles/App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/carteira" component={ Wallet } />
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
    </Switch>
  );
}

export default App;
