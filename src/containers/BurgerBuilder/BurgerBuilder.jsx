import React, { Component } from 'react';
import axiosInstance from '../../hoc/axiosInstance';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

const ingredientPrices = {
    salad: 25,
    cheese: 50,
    meat: 100,
    bacon: 30
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 50,
        purchasable: false,
        ordered: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axiosInstance.get('/ingredients.json').then(res => {
            this.setState({ ingredients: res.data })
        }).catch(err => {
            this.setState({ error: true })
        });
    }
    orderHandler = () => {
        this.setState({ ordered: true });
    }

    cancelOrderHandler = () => {
        this.setState({ ordered: false });
    }

    continueOrderHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(i + '=' + this.state.ingredients[i]);
        }
        queryParams.push("price=" + this.state.totalPrice);
        const query = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + query
        });
    }

    isPurchasable = (ingredients) => {
        const totalQuantity = Object.keys(ingredients)
            .map(igType => ingredients[igType])
            .reduce((sum, el) => sum + el);
        this.setState({ purchasable: totalQuantity > 0 });
    }

    addIngredient = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + ingredientPrices[type];
        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
        this.isPurchasable(newIngredients);
    }

    reduceIngredient = (type) => {
        if (this.state.ingredients[type] > 0) {
            const newCount = this.state.ingredients[type] - 1;
            const newIngredients = {
                ...this.state.ingredients
            };
            newIngredients[type] = newCount;
            const newPrice = this.state.totalPrice - ingredientPrices[type];
            this.setState({ ingredients: newIngredients, totalPrice: newPrice });
            this.isPurchasable(newIngredients);
        }
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let ig in disableInfo) {
            disableInfo[ig] = disableInfo[ig] <= 0;
        }
        let summary = null;
        let burger = this.state.error ? <p>Ingredients can't be fetched.</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAddition={this.addIngredient}
                        ingredientReduction={this.reduceIngredient}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.orderHandler} />
                </React.Fragment>
            );
            summary = <OrderSummary
                ingredients={this.state.ingredients}
                ingredientPrices={ingredientPrices}
                totalPrice={this.state.totalPrice}
                cancelPurchase={this.cancelOrderHandler}
                continuePurchase={this.continueOrderHandler} />;
        }
        if (this.state.loading)
            summary = <Spinner />;
        return (
            <React.Fragment>
                <Modal show={this.state.ordered} modalClosed={this.cancelOrderHandler}>
                    {summary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default ErrorHandler(BurgerBuilder, axiosInstance);