import React from 'react';
import classes from './Togglesidedrawer.module.css';

const toggleSidedrawer = (props) => (
    <div onClick={props.clicked}
        className={classes.DrawerToggle} >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default toggleSidedrawer;