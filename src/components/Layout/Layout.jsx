import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        sideDrawerVisible: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ sideDrawerVisible: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                sideDrawerVisible: !prevState.sideDrawerVisible
            };
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar toggle={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.sideDrawerVisible} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }

}

export default Layout;