import React, { Component } from 'react';
import classes from './Card.module.scss';
import Dialog from "../dialog/Dialog";

class Card extends Component {

    state = {
        cardDialogOpened: false
    }

    render() {
        console.log('CARD PROPS BELOW')
        console.log(this.props);

        return(
            <>
                <li className={classes.cardWrapper}>
                    <div className={classes.card} tabIndex={0} onClick={() => this.setState({cardDialogOpened: true})}>
                        <h3>{this.props.card?.name}</h3>
                        <p className={classes.cardDesc}>{this.props.card?.desc}</p>
                        {this.props.children}
                    </div>
                </li>
                <Dialog
                    open={this.state.cardDialogOpened}
                    title="Card details"
                    close={ () => this.setState({ cardDialogOpened: false }) }
                    onSubmit={ () => {
                        console.log('test')
                    }}
                    footerActionLabel={"Close"}
                >
                </Dialog>
            </>
        )
    }
}

export default Card;