import React from 'react';
import classes from './Navitems.module.css';
import Navitem from './NavItem/Navitem';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <Navitem link="/" exact>Burger Builder</Navitem>
        <Navitem link="/orders">Orders</Navitem>
    </ul>
);

export default navItems;