import React from "react"
import classes from './Input.module.scss';

const Input = props => {

    const {
        type,
        name,
        id,
        value,
        onChange
    } = props;

    return(
        <input
            className={classes.input}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            name={name}
        />
    );
}

export default Input;