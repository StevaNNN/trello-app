import React from 'react';
import classes from './Viewport.module.scss';
import Lists from "../lists/Lists";
import Button from "../shared/Button/Button";

const Viewport = (props) => {

    const {
        selectedBoardID,
        onBoardSelect,
        boards,
        userInfo,
        selectedBoardLists,
        deleteList,
        createNewList,
        openCard
    } = props;

    const renderBoardOptions = (boards) => {
        return(
            boards.map((board, index) => <option key={index} value={board.id}>{board.name}</option>)
        );
    }

    return(
        <div className={classes.viewport}>
            <header className={classes.header}>
                <div className={classes.selectHolder}>
                    <label htmlFor="boards">Choose a board:</label>
                    <div className={classes.selectWrapper}>
                        <select
                            className={classes.select}
                            value={ selectedBoardID }
                            id="boards"
                            onChange={ onBoardSelect }
                        >
                            {renderBoardOptions(boards)}
                        </select>
                        <i aria-hidden="true" className={`t-icon t-keyboard_arrow_down ${classes.selectIcon}`}/>
                    </div>
                </div>
                <div>
                    <Button iconClass="t-icon t-add" onClick={createNewList}>Create new list</Button>
                </div>
                <div className={classes.avatarHolder}>
                    <span className={classes.avatar}>{userInfo.initials}</span>
                    <span>{ userInfo.fullName }</span>
                </div>
            </header>
            <main className={classes.main}>
                <Lists selectedBoardLists={selectedBoardLists} deleteList={deleteList} openCard={openCard}/>
            </main>
            <footer className={classes.footer}>
                Created for interview purposes by Stevan Stojanovic
            </footer>
        </div>
    )
}

export default Viewport;