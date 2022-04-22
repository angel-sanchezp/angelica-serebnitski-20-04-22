import React from 'react';


import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import routes from './routes.js'

import { AppHeader } from "./cmps/AppHeader.jsx";

class _App extends React.Component {
  render() {

    return (
      <>
        <AppHeader />
        <main className="main-app">
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </main>
      </>
    )
  }
}

export const App = withRouter(_App)

