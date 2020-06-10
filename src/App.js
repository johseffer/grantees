import React from 'react'
import { useRoutes } from 'hookrouter'
import { SnackbarProvider } from 'notistack'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import routes from './routes'

import Nav from './components/nav/nav.component'

import './App.scss'


function App() {
  const routeResult = useRoutes(routes);
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  }

  return (
    <>
      <SnackbarProvider maxSnack={3} ref={notistackRef} action={(key) => (
        <IconButton aria-label="fechar" onClick={onClickDismiss(key)}>
          <CloseIcon />
        </IconButton>
      )}>
        <Nav />
        {routeResult}
      </SnackbarProvider>
    </>
  );
}

export default App;
