import React, { Component } from 'react';
import classes from './Lists.module.scss';
import List from "../list/List";

class Lists extends Component {

    render() {
        console.log('LISTS PROPS BELOW')
        console.log(this.props);
        return(
            <ul className={classes.lists}>
                {this.props.selectedBoardLists.map(list => {
                    return(
                        <List
                            key={list.id}
                            id={list.id}
                            listName={list.name}
                            openCard={this.props.openCard}
                            deleteList={this.props.deleteList}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default Lists;
