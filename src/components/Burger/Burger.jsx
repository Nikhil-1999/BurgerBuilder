import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let desiredIngredients = Object.keys(props.ingredients)
        .map(igType => [...Array(props.ingredients[igType])]
            .map((_, index) => <BurgerIngredients key={igType + index} type={igType} />))
        .reduce((arr, el) => arr.concat(el));

    if (desiredIngredients.length === 0) {
        desiredIngredients = <p>Start Adding Delicious Ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {desiredIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}

export default burger;