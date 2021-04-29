import React from "react";
import classes from './Backdrop.module.scss';

const backdrop = props => {
    const {
        show,
        clicked
    } = props;

    return(
        show ? <div className={classes.Backdrop} onClick={clicked} /> : null
    )
}

export default backdrop;
