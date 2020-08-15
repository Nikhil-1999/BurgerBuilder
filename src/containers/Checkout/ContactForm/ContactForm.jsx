import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import Button from '../../../components/UI/Modal/Button/Button';
import axiosInstance from '../../../hoc/axiosInstance';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactForm extends Component {
    state = {
        formData: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                valueType: "Name",
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                valueType: "Street Address",
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                valueType: "ZIP Code",
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                valueType: "Country Name",
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail id'
                },
                valueType: "Email Address",
                value: '',
                validation: {
                    required: true,
                    validatePattern: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'homeDelivery', label: 'Home Delivery' },
                        { value: 'takeAway', label: 'TakeAway' },
                    ]
                },
                value: 'homeDelivery',
                validation: {},
                valid: true
            }
        },
        isFormValid: false,
        loading: false,
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkValidity(value, validationRules) {
        let isValid = true;
        if (validationRules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validationRules.minLength) {
            isValid = value.trim().length >= validationRules.minLength && isValid;
        }

        if (validationRules.maxLength) {
            isValid = value.trim().length <= validationRules.maxLength && isValid;
        }

        if(validationRules.validatePattern){
            isValid = this.validateEmail(value.trim()) && isValid;
        }
        return isValid;
    }

    orderSuccessHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let formData = {};
        for (let field in this.state.formData) {
            formData[field] = this.state.formData[field].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };
        axiosInstance.post("https://react-burger-builder-4295a.firebaseio.com/orders.json", order).then(res => {
            this.setState({ loading: false })
            this.props.history.push('/');
        });
    }

    inputChangeHandler = (event, inputField) => {
        const contactFormData = {
            ...this.state.formData
        };
        const contactFormFieldData = {
            ...contactFormData[inputField]
        };
        contactFormFieldData.value = event.target.value;
        contactFormFieldData.valid = this.checkValidity(contactFormFieldData.value, contactFormFieldData.validation);
        contactFormFieldData.touched = true;
        contactFormData[inputField] = contactFormFieldData;

        let isFormValid = true;
        for (let field in contactFormData) {
            isFormValid = contactFormData[field].valid && isFormValid;
        }
        this.setState({ formData: contactFormData, isFormValid: isFormValid });
    }

    render() {
        let fieldArray = [];
        for (var field in this.state.formData) {
            fieldArray.push({
                id: field,
                config: this.state.formData[field]
            });
        }
        let form = (
            <form onSubmit={this.orderSuccessHandler}>
                {fieldArray.map(field => (
                    <Input
                        key={field.id}
                        elementType={field.config.elementType}
                        elementConfig={field.config.elementConfig}
                        value={field.config.value}
                        invalid={!field.config.valid}
                        validationNeeded={field.config.validation}
                        touched={field.config.touched}
                        valueType={field.config.valueType}
                        changed={(event) => this.inputChangeHandler(event, field.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.isFormValid} clicked={this.orderSuccessHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactForm}>
                <h3>Enter Your Contact Details</h3>
                {form}
            </div>
        );
    }
}

export default ContactForm;