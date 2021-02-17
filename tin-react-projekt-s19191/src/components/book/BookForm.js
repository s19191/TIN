import React from "react";
import {Redirect, withRouter} from 'react-router-dom';
import formMode from '../../helpers/formHelper';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange, checkDate, checkDateIfAfter } from '../../helpers/validationCommon';
import { getBookByIdApiCall, addBookApiCall, updateBookApiCall } from '../../apiCalls/bookApiCalls';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import { withTranslation } from 'react-i18next';
import { getFormattedDate } from "../../helpers/dateHelper";
import { getCurrentUser } from "../../helpers/authHelper";

class BookForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsKsId = props.match.params.ksId;
        const currentFormMode = paramsKsId ? formMode.EDIT : formMode.NEW;
        const user = getCurrentUser();

        this.state = {
            ksId: paramsKsId,
            ks: {
                User_Id_User: user.userId,
                Tytul: '',
                Autor: '',
                DataWydania: ''
            },
            errors: {
                User_Id_User: user.userId,
                Tytul: '',
                Autor: '',
                DataWydania: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            isLoaded: false
        };
    };

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchBookDetails();
        };
    };

    fetchBookDetails = () => {
        getBookByIdApiCall(this.state.ksId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            ks: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const ks = { ...this.state.ks };
        ks[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            ks: ks,
            errors: errors
        })
    };

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Tytul') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            };
        };
        if (fieldName === 'Autor') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            };
        };
        if (fieldName === 'DataWydania') {
            let nowDate = new Date(),
                month = '' + (nowDate.getMonth() + 1),
                day = '' + nowDate.getDate(),
                year = nowDate.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            const nowString = [year, month, day].join('-');
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isDate;
            } else if (checkDateIfAfter(fieldValue, nowString)) {
                errorMessage = formValidationKeys.isNotFutureDate;
            };
        };
        return errorMessage;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
                ks = this.state.ks,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addBookApiCall(ks);
            } else if (currentFormMode === formMode.EDIT) {
                const ksId = this.state.ksId;
                promise = updateBookApiCall(ksId, ks);
            };
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
                        });
            };
        };
    };

    validateForm = () => {
        const ks = this.state.ks;
        const errors = this.state.errors;
        for (const fieldName in ks) {
            const fieldValue = ks[fieldName];
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
        const { redirect, isLoaded } = this.state;
        const { t } = this.props;
        if (redirect) {
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? t('ks.form.add.confirm.text') : t('ks.form.edit.confirm.text');
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
        const pageTitle = this.state.formMode === formMode.NEW ? t('ks.form.add.pageTitle') : t('ks.form.edit.pageTitle');
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        const pattern = /Ksiazka with id: \d+ not found/;
        if (isLoaded && this.state.formMode === formMode.EDIT && pattern.test(globalErrorMessage)){
            return (
                <main>
                    <p>{globalErrorMessage}</p>
                </main>
            )
        } else {
            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <FormInput
                            type="text"
                            label={t('ks.form.fields.Tytul')}
                            required
                            error={this.state.errors.Tytul}
                            name="Tytul"
                            placeholder={t('ks.form.placeholders.Tytul')}
                            onChange={this.handleChange}
                            value={this.state.ks.Tytul}
                        />
                        <FormInput
                            type="text"
                            label={t('ks.form.fields.Autor')}
                            required
                            error={this.state.errors.Autor}
                            name="Autor"
                            placeholder={t('ks.form.placeholders.Autor')}
                            onChange={this.handleChange}
                            value={this.state.ks.Autor}
                        />
                        <FormInput
                            type="date"
                            label={t('ks.form.fields.DataWydania')}
                            required
                            error={this.state.errors.DataWydania}
                            name="DataWydania"
                            placeholder={t('ks.form.placeholders.DataWydania')}
                            onChange={this.handleChange}
                            value={this.state.ks.DataWydania ? getFormattedDate(this.state.ks.DataWydania) : ""}
                        />
                        <FormButtons
                            formMode={this.state.formMode}
                            error={globalErrorMessage}
                            cancelPath="/book"
                        />
                    </form>
                    <p className="success">{this.state.notice}</p>
                </main>
            )
        }
    };
};

export default withTranslation()(withRouter(BookForm));