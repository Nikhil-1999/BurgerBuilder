import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../hoc/axiosInstance';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: null,
        totalOrders: 0,
        loading: true
    }

    componentDidMount() {
        axiosInstance.get('/orders.json').then(response => {
            let orderArr = [];
            for (var key in response.data) {
                const order = response.data[key];
                const orderData = this.getEachOrderData(order);
                orderArr.push(orderData);
            }
            this.setState({ orders: orderArr, totalOrders: orderArr.length, loading: false })
        });
    }

    getEachOrderData(order) {
        const ingredients = order['ingredients'];
        const orderData = order['orderData'];
        const price = order.price;
        let orderIngredients = "Ingredients: ";
        for (var ingredient in ingredients) {
            orderIngredients += ingredient + '(' + ingredients[ingredient] + ') ';
        }
        const email = orderData?.email;
        const name = orderData?.name;
        const address = orderData?.street + ", " + orderData?.zipCode + ", " + orderData?.country;
        const deliveryMethod = orderData?.deliveryMethod === "takeAway" ? "TakeAway" : "Home Delivery";
        const eachOrderData = {
            name: name,
            email: email,
            address: address,
            deliveryMethod: deliveryMethod,
            ingredients: orderIngredients,
            price: price
        }
        return eachOrderData;
    }

    render() {
        let order = null;
        if (this.state.loading) {
            order = <Spinner />;
        }
        else {
            order = <Order orderInfo={this.state.orders} totalOrders={this.state.totalOrders} />
        }
        return (
            <div >
                {order}
            </div>
        );
    }
}

export default Orders;