import React from 'react';

function DetailsInput(props) {
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title="required" aria-label="required">*</abbr>}
            </label>
            <input
                type={props.type}
                name={props.name}
                id={props.name}
                disabled={true}
                value={props.value}
            />
            <span></span>
        </>
    )
};

export default DetailsInput;