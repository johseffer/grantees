import React from 'react'
import { useRoutes } from 'hookrouter'
import routes from './routes'

import Nav from './components/nav/nav.component'

import styles from './App.scss'


function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className={styles.container}>
      <Nav />
      {routeResult}
    </div>
  );
}

export default App;
