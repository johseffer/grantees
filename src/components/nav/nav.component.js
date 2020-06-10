import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


import transfeeraIcon from './images/transfeera-logo-verde.svg';

import './nav.component.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#1FBFAE',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '25px'
    },
    indicator: {
        backgroundColor: 'white',
    }
}));

const Nav = () => {
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();
    
    return (
        <>
            <div data-testid="navbar" className="container">
                <div className="header">
                    <img className="iconeTransfera" alt="" src={transfeeraIcon} />
                </div>
                <AppBar className={classes.root} position="static">
                    <Tabs classes={{ indicator: classes.indicator }} value={value} onChange={handleChange}>
                        <Tab style={{ textTransform: 'none' }} label="Seus Favorecidos" href="/" component="a"  id="nav-tab-grantees" />
                    </Tabs>
                </AppBar>
            </div>
        </>
    )
}

export default Nav