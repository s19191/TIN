import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import FormInput from '../form/FormInput';
import { loginApiCall } from '../../apiCalls/authApiCalls';
import { checkRequired } from '../../helpers/validationCommon';
import { formValidationKeys } from '../../helpers/formHelper';
import AuthButtons from "../form/AuthButtons";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Email: '',
                Password: ''
            },
            errors: {
                Email: '',
                Password: ''
            },
            error: '',
            message: '',
            prevPath: ''
        };
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const user = { ...this.state.user };
        user[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            user: user,
            errors: errors
        })
    };

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            };
        };
        if (fieldName === 'Password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            };
        };
        return errorMessage;
    };

    handleSumbit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const user = this.state.user;
            let response;
            loginApiCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data);
                                this.props.handleLogin(userString);
                                this.props.history.goBack();
                            }
                        } else if (response.status === 401) {
                            console.log(401)
                            this.setState({ message: data.message });
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    })
        };
    };

    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;
        for (const fieldName in user) {
            const fieldValue = user[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        };
        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    };

    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true;
            };
        };
        return false;
    };

    render() {
        const { t } = this.props;
        const errorsSummary = this.hasErrors() ? t('validationMessage.formErrors') : '';
        const fetchError = this.state.error ? t('errors.error') + `${this.state.error.message}` : '';
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        return (
            <main>
                {/*<div id="login" className="logInDiv">*/}
                <div id="login">
                    <h2>{t('authentication.title')}</h2>
                    <form className="form" method="post" onSubmit={this.handleSumbit}>
                        <FormInput
                            type="email"
                            label={t('authentication.email')}
                            required
                            error={this.state.errors.Email}
                            name="Email"
                            onChange={this.handleChange}
                            value={this.state.user.Email}
                        />
                        <FormInput
                            type="password"
                            label={t('authentication.password')}
                            required
                            error={this.state.errors.Password}
                            name="Password"
                            onChange={this.handleChange}
                            value={this.state.user.Password}
                        />
                        <AuthButtons
                            cancelPath={this.state.prevPath}
                            error={globalErrorMessage}
                            submitButtonLabel={t('authentication.actions.logIn')}
                        />
                    </form>
                </div>
            </main>
        )
    };
};

export default withRouter(withTranslation()(LoginForm));