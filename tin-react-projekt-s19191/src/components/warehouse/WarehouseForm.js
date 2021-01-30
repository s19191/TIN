import React from "react";
import { Redirect } from 'react-router-dom';
import formMode from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange, checkAdress } from '../../helpers/validationCommon';
import { getWarehouseByIdApiCall, addWarehouseApiCall, updateWarehouseApiCall } from '../../apiCalls/warehouseApiCalls';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

class WarehouseForm extends React.Component {
    constructor(props) {
        super(props)

        const paramsMagId = props.match.params.magId
        const currentFormMode = paramsMagId ? formMode.EDIT : formMode.NEW

        this.state = {
            magId: paramsMagId,
            mag: {
                User_Id_User: 1,
                Nazwa: '',
                Adres: ''
            },
            errors: {
                User_Id_User: 1,
                Nazwa: '',
                Adres: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        };
    };

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
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
        const { name, value } = event.target
        const mag = { ...this.state.mag }
        mag[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            mag: mag,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Nazwa') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'Adres') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkAdress(fieldValue)) {
                errorMessage = 'Pole powinno zawierać adres w formacie np. ul. Gorka 14C'
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
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
        const mag = this.state.mag
        const errors = this.state.errors
        for (const fieldName in mag) {
            const fieldValue = mag[fieldName]
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
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowy magazyn' : 'Pomyślnie zaktualizowano magazyn'
            return (
                <Redirect to={{
                    pathname: "/warehouse/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodawanie magazynu' : 'Edycja magazynu'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Nazwa"
                        required
                        error={this.state.errors.Nazwa}
                        name="Nazwa"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.mag.Nazwa}
                    />
                    <FormInput
                        type="text"
                        label="Adres"
                        required
                        error={this.state.errors.Adres}
                        name="Adres"
                        placeholder="np. ul. Gorka 15/67"
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

export default WarehouseForm;