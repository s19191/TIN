import React from "react";
import { Redirect } from 'react-router-dom';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange, checkEmail } from '../../helpers/validationCommon';
import { addUserApiCall } from '../../apiCalls/userApiCalls';
import FormInput from "../form/FormInput";
import { withTranslation } from 'react-i18next';
import RegisterButtons from "../form/RegisterButtons";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsKsId = props.match.params.ksId;

        this.state = {
            ksId: paramsKsId,
            user: {
                Name: '',
                Surname: '',
                Email: '',
                Password: ''
            },
            errors: {
                Name: '',
                Surname: '',
                Email: '',
                Password: ''
            },
            redirect: false,
            error: null
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
        if (fieldName === 'Name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            };
        };
        if (fieldName === 'Surname') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            };
        };
        if (fieldName === 'Email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail;
            };
        };
        if (fieldName === 'Password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            };
        };
        return errorMessage;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const user = this.state.user;
            let
                promise,
                response;
                promise = addUserApiCall(user);
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json();
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                for (const i in data) {
                                    const errorItem = data[i];
                                    const errorMessage = errorItem.message;
                                    const fieldName = errorItem.path;
                                    const errors = { ...this.state.errors };
                                    errors[fieldName] = errorMessage;
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                };
                            } else {
                                this.setState({ redirect: true })
                            };
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }

        }
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
        const { redirect } = this.state;
        const { t } = this.props;
        if (redirect) {
            const notice = t('ks.form.add.confirm.text');
            return (
                <Redirect to={{
                    pathname: "/book/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        };

        const errorsSummary = this.hasErrors() ? t('validationMessage.formErrors') : '';
        const fetchError = this.state.error ? t('errors.error') + `${this.state.error.message}` : '';
        const pageTitle = t('register.add.pageTitle');
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('register.fields.Name')}
                        required
                        error={this.state.errors.Name}
                        name="Name"
                        placeholder={t('register.placeholders.Name')}
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type="text"
                        label={t('register.fields.Surname')}
                        required
                        error={this.state.errors.Surname}
                        name="Surname"
                        placeholder={t('register.placeholders.Surname')}
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type="email"
                        label={t('register.fields.Email')}
                        required
                        error={this.state.errors.Email}
                        name="Email"
                        placeholder={t('register.placeholders.Email')}
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type="password"
                        label={t('register.fields.Password')}
                        required
                        error={this.state.errors.Password}
                        name="Password"
                        placeholder={t('register.placeholders.Password')}
                        onChange={this.handleChange}
                    />
                    <RegisterButtons
                        error={globalErrorMessage}
                        cancelPath="/"
                    />
                </form>
                <p className="success">{this.state.notice}</p>
            </main >
        )
    };
};

export default withTranslation()(RegisterForm);