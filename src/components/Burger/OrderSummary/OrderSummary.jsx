import React from 'react';
import Button from '../../UI/Modal/Button/Button';

const orderSummary = (props) => {
    const summary = Object.keys(props.ingredients)
        .map(igType =>
            <li key={igType}>
                <span style={{ textTransform: 'capitalize' }}>{igType}</span>
                ({props.ingredients[igType]})
                =  {props.ingredientPrices[igType] * props.ingredients[igType]} Rs.
            </li>);
    return (
        <React.Fragment>
            <h3>Your Order Summary</h3>
            <p>Have a Delicious feast!!!</p>
            <ul>
                <li>Bread-Top(1) = 25 Rs.</li>
                {summary}
                <li>Bread-Bottom(1) = 25 Rs.</li>
            </ul>
            <p><strong>Total Price : {props.totalPrice} Rs.</strong></p>
            <p>Checkout your Burger?</p>
            <Button btnType='Danger' clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continuePurchase}>ORDER</Button>
        </React.Fragment>
    );
};

export default orderSummary;