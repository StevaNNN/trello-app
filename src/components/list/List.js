import React, { Component } from 'react';
import classes from './List.module.scss';
import Card from "../card/Card";
import { API_TOKEN, API_KEY, BASE_URL } from "../util";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Dialog from "../dialog/Dialog";

class List extends Component {
    cardListNameRef;

    state = {
        cards: [],
        cardListName: '',
        newCardData: {
            name: ''
        },
        cardDialogOpened: false
    }
    componentDidMount() {
        this.getCardsFromList();
    }

    getCardsFromList = async () => {
        const test = await fetch(`${BASE_URL}lists/${this.props.id}/cards?key=${API_KEY}&token=${API_TOKEN}`)
        test.json()
            .then(data => this.setState({cards: data}))
    }

    updateCardListName = async (id, name) => {
        const updateCardListName = await fetch(`${BASE_URL}lists/${id}?key=${API_KEY}&token=${API_TOKEN}&name=${name}`, {method: "PUT"});
        updateCardListName.json()
            .catch(err => console.log(err))
    }

    onBtnClick = () => {
        this.cardListNameRef.setAttribute("contenteditable", "true");
        this.cardListNameRef.focus();
    }

    onHeadingKeyDown = (event) => {
        this.setState({ cardListName: event.nativeEvent.target.innerText });
    }

    onHeadingBlur = (id) => {
        this.cardListNameRef.removeAttribute("contenteditable");
        this.updateCardListName(id, this.state.cardListName);
    }

    createNewCard = async (name, id) => {
        const test = await fetch(`${BASE_URL}cards?key=${API_KEY}&token=${API_TOKEN}&idList=${id}&name=${name}`, { method: "POST" })
        test.json()
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    render() {
        console.log('LIST PROPS BELOW')
        console.log(this.props);
        console.log('LIST STATE BELOW')
        console.log(this.state);

        const newCardObject = {...this.state.newCardData};

        return(
            <>
                <li className={classes.listItem} tabIndex={0}>
                    <div className={classes.cardListHeader}>
                        <h3
                            className={classes.listTitle}
                            onKeyDown={this.onHeadingKeyDown}
                            ref={(headingElement) => this.cardListNameRef = headingElement}
                            onBlur={this.onHeadingBlur.bind(this, this.props.id)}
                        >
                            {this.props.listName}
                        </h3>
                        <div className={classes.actionWrap}>
                            <Button iconClass={`t-icon t-edit`} onClick={this.onBtnClick}/>
                            <Button iconClass={`t-icon t-delete`} onClick={() => this.props.deleteList(this.props.id)}/>
                        </div>
                    </div>
                    <ul className={classes.cardList}>
                        {this.state.cards.map((card, id) => <Card key={id} card={card} listID={this.props.id} openCard={this.props.openCard}/>)}
                        <Button additionalClass={classes.createNewCardButton} onClick={() => this.setState({ cardDialogOpened: true })}>Create new card</Button>
                    </ul>
                </li>
                <Dialog
                    open={this.state.cardDialogOpened}
                    title="Create new card"
                    close={ () => this.setState({ cardDialogOpened: false }) }
                    onSubmit={ () => {
                        this.createNewCard(this.state.newCardData.name, this.props.id);
                        this.setState({ cardDialogOpened: false })
                    }}
                    footerActionLabel={"Create"}
                >
                    <label htmlFor="newCardInput">Insert name for new card</label>
                    <Input
                        type={"text"}
                        value={this.state.newCardData.name}
                        id={"newCardInput"}
                        onChange={(event) => {
                            newCardObject.name = event.target.value;
                            this.setState({ newCardData: newCardObject })
                        }}
                    />
                </Dialog>
            </>
        )
    }
}

export default List;