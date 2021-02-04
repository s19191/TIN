import React from "react";
import {Redirect, withRouter} from 'react-router-dom';
import formMode from '../../helpers/formHelper';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkNumber, checkNumberRange } from '../../helpers/validationCommon';
import { getConditionInWarehouseByIdApiCall, addConditionInWarehouseApiCall, updateConditionInWarehouseApiCall } from '../../apiCalls/conditionInWarehouseApiCalls';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import FormSelect from "../form/FormSelect";
import { withTranslation } from 'react-i18next';
import { getBooksApiCall } from "../../apiCalls/bookApiCalls";
import { getWarehousesApiCall } from "../../apiCalls/warehouseApiCalls";
import {getCurrentUser, isCreatorOrAdmin} from "../../helpers/authHelper";

class ConditionsInWarehouseForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsSwmId = props.match.params.swmId;
        const currentFormMode = paramsSwmId ? formMode.EDIT : formMode.NEW;
        const user = getCurrentUser();

        this.state = {
            swmId: paramsSwmId,
            swm: {
                Ksiazka_Id_Ksiazka: '',
                Magazyn_Id_Magazyn: '',
                User_Id_User: user.userId,
                IloscNaStanie: '',
                CenaHurtowa: '',
                MinimalnaIloscDoCenyHurtowej: '',
                CenaDetaliczna: ''
            },
            errors: {
                Ksiazka_Id_Ksiazka: '',
                Magazyn_Id_Magazyn: '',
                User_Id_User: user.userId,
                IloscNaStanie: '',
                CenaHurtowa: '',
                MinimalnaIloscDoCenyHurtowej: '',
                CenaDetaliczna: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            allKs: [],
            allMag: []
        };
    };

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchConditionInWarehouseDetails();
        };
        this.fetchBookList();
        this.fetchWarehouseList();
    };

    fetchConditionInWarehouseDetails = () => {
        getConditionInWarehouseByIdApiCall(this.state.swmId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            swm: data,
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

    fetchBookList = () => {
        getBooksApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        allKs: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    fetchWarehouseList = () => {
        getWarehousesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        allMag: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const swm = { ...this.state.swm };
        swm[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            swm: swm,
            errors: errors
        })
    };

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Ksiazka_Id_Ksiazka') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        };
        if (fieldName === 'Magazyn_Id_Magazyn') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            };
        };
        if (fieldName === 'IloscNaStanie') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber;
            } else if (!checkNumberRange(fieldValue, 0)) {
                errorMessage = formValidationKeys.isNumberPlus;
            };
        };
        if (fieldName === 'CenaHurtowa') {
            if (!checkNumber(fieldValue) && checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.isNumber;
            } else if (!checkNumberRange(fieldValue, 0) && checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.isNumberPlus;
            };
        };
        if (fieldName === 'MinimalnaIloscDoCenyHurtowej') {
            if (!checkNumber(fieldValue) && checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.isNumber;
            } else if (!checkNumberRange(fieldValue, 0) && checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.isNumberPlus;
            };
        };
        if (fieldName === 'CenaDetaliczna') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber;
            } else if (!checkNumberRange(fieldValue, 0)) {
                errorMessage = formValidationKeys.isNumberPlus;
            };
        };
        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
                swm = this.state.swm,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addConditionInWarehouseApiCall(swm);
            } else if (currentFormMode === formMode.EDIT) {
                const swmId = this.state.swmId;
                promise = updateConditionInWarehouseApiCall(swmId, swm);
            };
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json();
                            };
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
                                    });
                                }
                            } else {
                                this.setState({ redirect: true });
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            };
        }
    };

    validateForm = () => {
        const swm = this.state.swm;
        const errors = this.state.errors;
        for (const fieldName in swm) {
            const fieldValue = swm[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        };
        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }

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
        if (!isCreatorOrAdmin(this.state.swm.User_Id_User) && this.state.isLoaded) {
            return (
                <Redirect to="/conditionInWarehouse" />
            )
        } else {
            const {redirect} = this.state;
            const {t} = this.props;
            if (redirect) {
                const currentFormMode = this.state.formMode;
                const notice = currentFormMode === formMode.NEW ? t('swm.form.add.confirm.text') : t('swm.form.add.confirm.text');
                return (
                    <Redirect to={{
                        pathname: "/conditionInWarehouse/",
                        state: {
                            notice: notice
                        }
                    }}/>
                )
            };

            const errorsSummary = this.hasErrors() ? t('validationMessage.formErrors') : '';
            const fetchError = this.state.error ? t('errors.error') + `${this.state.error.message}` : '';
            const pageTitle = this.state.formMode === formMode.NEW ? t('swm.form.add.pageTitle') : t('swm.form.edit.pageTitle');
            const globalErrorMessage = errorsSummary || fetchError || this.state.message;

            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <FormSelect
                            label={t('swm.form.fields.Ksiazka.label')}
                            select={t('swm.form.fields.Ksiazka.select')}
                            required
                            error={this.state.errors.Ksiazka_Id_Ksiazka}
                            name="Ksiazka_Id_Ksiazka"
                            onChange={this.handleChange}
                            value={this.state.swm.Ksiazka_Id_Ksiazka}
                            list={this.state.allKs}
                            id={this.state.swm.Ksiazka_Id_Ksiazka}
                        />
                        <FormSelect
                            label={t('swm.form.fields.Magazyn.label')}
                            select={t('swm.form.fields.Magazyn.select')}
                            required
                            error={this.state.errors.Magazyn_Id_Magazyn}
                            name="Magazyn_Id_Magazyn"
                            onChange={this.handleChange}
                            value={this.state.swm.Magazyn_Id_Magazyn}
                            list={this.state.allMag}
                            id={this.state.swm.Magazyn_Id_Magazyn}
                        />
                        <FormInput
                            type="number"
                            label={t('swm.form.fields.IloscNaStanie')}
                            required
                            error={this.state.errors.IloscNaStanie}
                            name="IloscNaStanie"
                            onChange={this.handleChange}
                            value={this.state.swm.IloscNaStanie}
                        />
                        <FormInput
                            type="number"
                            label={t('swm.form.fields.CenaHurtowa')}
                            error={this.state.errors.CenaHurtowa}
                            name="CenaHurtowa"
                            onChange={this.handleChange}
                            value={this.state.swm.CenaHurtowa}
                        />
                        <FormInput
                            type="number"
                            label={t('swm.form.fields.MinimalnaIloscDoCenyHurtowej')}
                            error={this.state.errors.MinimalnaIloscDoCenyHurtowej}
                            name="MinimalnaIloscDoCenyHurtowej"
                            onChange={this.handleChange}
                            value={this.state.swm.MinimalnaIloscDoCenyHurtowej}
                        />
                        <FormInput
                            type="number"
                            label={t('swm.form.fields.CenaDetaliczna')}
                            required
                            error={this.state.errors.CenaDetaliczna}
                            name="CenaDetaliczna"
                            onChange={this.handleChange}
                            value={this.state.swm.CenaDetaliczna}
                        />
                        <FormButtons
                            formMode={this.state.formMode}
                            error={globalErrorMessage}
                            cancelPath="/conditionInWarehouse"
                        />
                    </form>
                    <p className="success">{this.state.notice}</p>
                </main>
            )
        };
    };
};

export default withTranslation()(withRouter(ConditionsInWarehouseForm));