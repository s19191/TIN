import React from "react";
import { Redirect } from 'react-router-dom';
import formMode from '../../helpers/formHelper';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange, checkAdress } from '../../helpers/validationCommon';
import { getWarehouseByIdApiCall, addWarehouseApiCall, updateWarehouseApiCall } from '../../apiCalls/warehouseApiCalls';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import { withTranslation } from 'react-i18next';
import {getCurrentUser} from "../../helpers/authHelper";

class WarehouseForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsMagId = props.match.params.magId;
        const currentFormMode = paramsMagId ? formMode.EDIT : formMode.NEW;
        const user = getCurrentUser();

        this.state = {
            magId: paramsMagId,
            mag: {
                User_Id_User: user.userId,
                Nazwa: '',
                Adres: ''
            },
            errors: {
                User_Id_User: user.userId,
                Nazwa: '',
                Adres: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        };
    };

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchWarehouseDetails();
        };
    };

    fetchWarehouseDetails = () => {
        getWarehouseByIdApiCall(this.state.magId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            mag: data,
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
        const mag = { ...this.state.mag };
        mag[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            mag: mag,
            errors: errors
        })
    };

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Nazwa') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60;
            };
        };
        if (fieldName === 'Adres') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkAdress(fieldValue)) {
                errorMessage = formValidationKeys.isCorrectAdress;
            };
        };
        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
                mag = this.state.mag,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addWarehouseApiCall(mag)
            } else if (currentFormMode === formMode.EDIT) {
                const magId = this.state.magId
                promise = updateWarehouseApiCall(magId, mag)
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
                            this.setState({ error });
                        }
                    )
            }
        }
    };

    validateForm = () => {
        const mag = this.state.mag;
        const errors = this.state.errors;
        for (const fieldName in mag) {
            const fieldValue = mag[fieldName];
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
    }

    render() {
        const { redirect } = this.state;
        const { t } = this.props;
        if (redirect) {
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? t('mag.form.add.confirm.text') : t('mag.form.add.confirm.text');
            return (
                <Redirect to={{
                    pathname: "/warehouse/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        };

        const errorsSummary = this.hasErrors() ? t('validationMessage.formErrors') : '';
        const fetchError = this.state.error ? t('errors.error') + `${this.state.error.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('mag.form.add.pageTitle') : t('mag.form.edit.pageTitle');
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('mag.form.fields.Nazwa')}
                        required
                        error={this.state.errors.Nazwa}
                        name="Nazwa"
                        placeholder={t('mag.form.placeholders.Nazwa')}
                        onChange={this.handleChange}
                        value={this.state.mag.Nazwa}
                    />
                    <FormInput
                        type="text"
                        label={t('mag.form.fields.Adres')}
                        required
                        error={this.state.errors.Adres}
                        name="Adres"
                        placeholder={t('mag.form.placeholders.Adres')}
                        onChange={this.handleChange}
                        value={this.state.mag.Adres}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/warehouse"
                    />
                </form>
            </main >
        )
    }
};

export default withTranslation()(WarehouseForm);