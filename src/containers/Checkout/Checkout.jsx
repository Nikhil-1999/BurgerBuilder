import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactForm from './ContactForm/ContactForm';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 0
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price;
        for (let i of queryParams.entries()) {
            if (i[0] === 'price')
                price = Number(i[1]);
            else
                ingredients[i[0]] = Number(i[1]);
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack('/');
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contactForm');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.checkoutCancelHandler}
                    continueCheckout={this.checkoutContinueHandler} />
                <Route
                    path={this.props.match.url + '/contactForm'}
                    render={(props) => (
                        <ContactForm
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            {...props} />
                    )} />
            </div>
        );
    }
}

export default Checkout;