import React from 'react'
import { useRoutes } from 'hookrouter'
import routes from './routes'

import Nav from './components/nav/nav.component'

import './App.scss'


function App() {
  const routeResult = useRoutes(routes);
  return (
    <>
      <Nav />
      {routeResult}
    </>
  );
}

export default App;
