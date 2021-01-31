import React from "react";
import { Redirect } from 'react-router-dom';
import formMode from '../../helpers/formHelper';
import { checkRequired, checkNumber, checkNumberRange } from '../../helpers/validationCommon';
import { getConditionInWarehouseByIdApiCall, addConditionInWarehouseApiCall, updateConditionInWarehouseApiCall } from '../../apiCalls/conditionInWarehouseApiCalls';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import { withTranslation } from 'react-i18next';

class ConditionsInWarehouseForm extends React.Component {
    constructor(props) {
        super(props)

        const paramsSwmId = props.match.params.swmId
        const currentFormMode = paramsSwmId ? formMode.EDIT : formMode.NEW

        this.state = {
            swmId: paramsSwmId,
            swm: {
                //TODO: Tu wrócić, jak będzie wiadomo jak zrobić selecta Książki i Magazunu
                Ksiazka_Id_Ksiazka: 1,
                Magazyn_Id_Magazyn: 1,
                User_Id_User: 1,
                IloscNaStanie: '',
                CenaHurtowa: '',
                MinimalnaIloscDoCenyHurtowej: '',
                CenaDetaliczna: ''
            },
            errors: {
                //TODO: Tu wrócić, jak będzie wiadomo jak zrobić selecta Książki i Magazunu
                Ksiazka_Id_Ksiazka: 1,
                Magazyn_Id_Magazyn: 1,
                User_Id_User: 1,
                IloscNaStanie: '',
                CenaHurtowa: '',
                MinimalnaIloscDoCenyHurtowej: '',
                CenaDetaliczna: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        };
    };

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchConditionInWarehouseDetails();
        };
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

    handleChange = (event) => {
        const { name, value } = event.target
        const swm = { ...this.state.swm }
        swm[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            swm: swm,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Ksiazka_Id_Ksiazka') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            }
        }
        if (fieldName === 'Magazyn_Id_Magazyn') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane';
            }
        }
        if (fieldName === 'IloscNaStanie') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNumberRange(fieldValue, 0)) {
                errorMessage = "Pole powinno być liczbą dodatnią";
            }
        }
        if (fieldName === 'CenaHurtowa') {
            if (!checkNumber(fieldValue) && checkRequired(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNumberRange(fieldValue, 0) && checkRequired(fieldValue)) {
                errorMessage = "Pole powinno być liczbą dodatnią";
            }
        }
        if (fieldName === 'MinimalnaIloscDoCenyHurtowej') {
            if (!checkNumber(fieldValue) && checkRequired(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNumberRange(fieldValue, 0) && checkRequired(fieldValue)) {
                errorMessage = "Pole powinno być liczbą dodatnią";
            }
        }
        if (fieldName === 'CenaDetaliczna') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNumberRange(fieldValue, 0)) {
                errorMessage = "Pole powinno być liczbą dodatnią";
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                swm = this.state.swm,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addConditionInWarehouseApiCall(swm)

            } else if (currentFormMode === formMode.EDIT) {
                const swmId = this.state.swmId
                promise = updateConditionInWarehouseApiCall(swmId, swm)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
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
        const swm = this.state.swm
        const errors = this.state.errors
        for (const fieldName in swm) {
            const fieldValue = swm[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    render() {
        const { redirect } = this.state;
        const { t } = this.props;
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('swm.form.add.confirm.text') : t('swm.form.add.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/conditionInWarehouse/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('validationMessage.Errors') : ''
        const fetchError = this.state.error ? t('errors.error') + `${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('swm.form.add.pageTitle') : t('swm.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    {/*TODO: Dodać selecta Książki i Magazynu*/}
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
                        required
                        error={this.state.errors.CenaHurtowa}
                        name="CenaHurtowa"
                        onChange={this.handleChange}
                        value={this.state.swm.CenaHurtowa}
                    />
                    <FormInput
                        type="number"
                        label={t('swm.form.fields.MinimalnaIloscDoCenyHurtowej')}
                        required
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
            </main >
        )
    }
};

export default withTranslation()(ConditionsInWarehouseForm);