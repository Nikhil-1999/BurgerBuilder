import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Navitems from '../Navitems/Navitems';
import ToggleSidedrawer from '../Sidedrawer/Togglesidedrawer/Togglesidedrawer';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleSidedrawer clicked={props.toggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <Navitems />
        </nav>
    </header>
);

export default toolbar;