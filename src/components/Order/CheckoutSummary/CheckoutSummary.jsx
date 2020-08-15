import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Modal/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>Enjoy Your Burger!!!</h1>
        <Burger style={{ width: '100%', margin: 'auto' }} ingredients={props.ingredients} />
        <Button
            btnType='Danger'
            clicked={props.cancelCheckout}>Cancel</Button>
        <Button
            btnType='Success'
            clicked={props.continueCheckout}>Continue</Button>
    </div>
);

export default checkoutSummary;