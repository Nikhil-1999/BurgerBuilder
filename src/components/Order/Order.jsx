import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    let displayOrders = props.orderInfo.reverse().map((order, index) => (
        <div className={classes.Order} key={index}>
            <p>Name: {order.name}</p>
            <p>Email-Id: {order.email}</p>
            <p>Delivery Address: {order.address}</p>
            <p>Delivery Method: {order.deliveryMethod}</p>
            <p>Order Summary: Burger with {order.ingredients}</p>
            <p>Price: Rs. {order.price}</p>
        </div>
    ));

    return (
        <div className={classes.OrderScreen}>
            <p>Review Your Orders!!!</p>
            <p>Total Orders: {props.totalOrders}</p>
            {displayOrders}
        </div>
    );

};

export default order;