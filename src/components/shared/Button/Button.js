import React from "react"
import classes from './Button.module.scss';
import classNames from "classnames";

const Button = props => {

    const {
        aria,
        iconClass,
        look,
        additionalClass,
        primary,
        onClick,
        children,
        rounded,
        block,
        large
    } = props;

    const btnClasses = classNames(
        `${classes.button} ${additionalClass ? additionalClass : ''}`,
        {

            [`${classes.primary}`]:  primary,
            [`${classes.flat}`]:     look === 'flat',
            [`${classes.rounded}`]:  rounded,
            [`${classes.block}`]:    block,
            [`${classes.large}`]:    large,
            [`${classes.iconOnly}`]: children === undefined && iconClass
        }
    )

    return(
        <button
            aria-label={aria ? aria.label : undefined}
            aria-hidden={aria ? aria.hidden : undefined}
            className={btnClasses}
            onClick={onClick}
        >
            {iconClass && <i aria-hidden="true" className={`${classes.icon} ${iconClass}`}/>}
            {children}
        </button>
    );
}

export default Button;