import React from 'react';
import Logo from '../../Logo/Logo';
import Navitems from '../Navitems/Navitems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Modal/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let totalClasses = [classes.SideDrawer, classes.Close];
    if (props.open)
        totalClasses = [classes.SideDrawer, classes.Open];
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={totalClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <Navitems />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;