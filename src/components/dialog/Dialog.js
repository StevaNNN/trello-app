import React, { Component }from "react";
import ReactDOM from 'react-dom';
import classes from './Dialog.module.scss';
import Button from "../shared/Button/Button";

class Dialog extends Component {

    render() {

        const {
            className,
            title,
            open,
            close,
            onSubmit,
            children,
            footerActionLabel
        } = this.props;

        return (
            open ? ReactDOM.createPortal(
                <div className={`${classes.wrapper} ${className ? className : ''}`}>
                    <div
                        className={classes.dialog}
                        tabIndex={open ? 0 : undefined}
                    >
                        <div className={classes.header}>
                            <h3 className={classes.title}>{title}</h3>
                            <Button iconClass="t-icon t-close" onClick={close}/>
                        </div>
                        <div className={classes.body}>
                            {children}
                        </div>
                        <div className={classes.footer}>
                            <Button onClick={onSubmit} primary>
                                {footerActionLabel}
                            </Button>
                        </div>
                    </div>
                </div>, document.body) : null
        );
    }
}

export default Dialog;