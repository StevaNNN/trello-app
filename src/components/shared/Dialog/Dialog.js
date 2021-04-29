import React, { Component }from "react";
import ReactDOM from 'react-dom';
import classes from './Dialog.module.scss';
import Button from "../Button/Button";

class Dialog extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // we are only re-rendering this component if props SHOWN or CHILDREN are not the same between current and next props
        const {open,children} = this.props;
        return nextProps.open !== open || nextProps.children !== children;
    }

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
                <div id="modal-dialog-wrapper" className={`${classes.wrapper} ${className ? className : ''}`}>
                    <div
                        className={classes.dialog}
                        tabIndex={open ? 0 : undefined}
                        aria-labelledby="dialog-title"
                    >
                        <div className={classes.header}>
                            <h3
                                id="dialog-title"
                                className={classes.title}>
                                {title}
                            </h3>
                            <Button
                                iconClass="db-icon db-close"
                                onClick={close} aria={{label: "Close dialog"}}
                            />
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
                </div>, document.body.querySelector('#root')) : null
        );
    }
}

export default Dialog;