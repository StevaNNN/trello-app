import React, { Component } from 'react';
import './theme/main.scss';
import Viewport from "./components/viewport/Viewport";
import Dialog from "./components/dialog/Dialog";
import LoadingPage from  "./components/loading-page/LoadingPage";

import { API_TOKEN, API_KEY, BASE_URL } from "./components/util";
import Input from "./components/shared/input/Input";

class App extends Component{

    state = {
        boards: [],
        selectedBoardLists: [],
        selectedBoardID: '',
        userInfo: {},
        newListDialogOpened: false,
        cardDialog: false,
        newListdata: {
            name: ''
        }
    }

    componentDidMount() {
        this.initData();
    }

    initData = () => {
        this.getUserInfo();
        this.getAllBoardsAndSelectFirst();
    };

    getUserInfo = async () => {
        const getUserInfo = await fetch(`${BASE_URL}members/me/?key=${API_KEY}&token=${API_TOKEN}`)
        getUserInfo.json()
            .then(data => this.setState({ userInfo: data }))
            .catch(err => console.log(err));
    }

    getAllBoardsAndSelectFirst = async () => {
        const getAllBoardsAndSelectFirst = await fetch(`${BASE_URL}members/me/boards?key=${API_KEY}&token=${API_TOKEN}`, { method: 'GET' })
        getAllBoardsAndSelectFirst.json()
            .then(data => { this.setState({ boards: data, selectedBoardID: data[0].id }, this.getFirstBoardAndListInside(data[0])); })
            .catch(err => console.log(err));
    }

    getFirstBoardAndListInside = (data) => {
        fetch(`${BASE_URL}boards/${data.id}/lists?key=${API_KEY}&token=${API_TOKEN}`, { method: 'GET' })
            .then(data => data.json())
            .then(data => this.setState({ selectedBoardLists: data }))
            .catch(err => console.log(err));
    }

    getListsofSelectedBoard = async () => {
        const { selectedBoardID } = this.state;
        const getListsOfSelectedBoard = await fetch(`${BASE_URL}boards/${selectedBoardID}/lists?key=${API_KEY}&token=${API_TOKEN}`, { method: 'GET' })
        getListsOfSelectedBoard.json()
            .then(data => this.setState({ selectedBoardLists: data }))
            .catch(err => console.log(err));
    }

    createNewList = async (id, name) => {
        const newList = await fetch(`${BASE_URL}boards/${id}/lists?key=${API_KEY}&token=${API_TOKEN}&name=${name}`, { method: 'POST' })
        newList.json()
            .then(() => { this.setState({ newListDialogOpened: false, newListdata: { name: ''} }); this.getListsofSelectedBoard(); })
            .catch(err => console.log(err))
    }

    archiveList = async (id) => {
        const archiveList = await fetch(`${BASE_URL}lists/${id}/closed?key=${API_KEY}&token=${API_TOKEN}&value=true`, { method: 'PUT' })
        archiveList.json()
            .then(() => this.getListsofSelectedBoard())
            .catch(err => console.log(err))
    }

    onBoardSelect = (event) => {
        const eventValue = event.target.value;
        this.setState({ selectedBoardID: eventValue }, this.getListsofSelectedBoard);
    }

    onListDelete = (id) => this.archiveList(id);

    render() {
        console.log("BOARDS STATE BELOW")
        console.log(this.state)

        const {
            boards,
            selectedBoardID,
            selectedBoardLists,
            userInfo,
            newListDialogOpened,
            newListdata
        } = this.state;

        const newListObject = {...newListdata};

        return (
            <>
                {selectedBoardLists.length > 0 ?
                    <Viewport
                        openCard={ () => this.setState({ cardDialogOpened: true }) }
                        boards={ boards }
                        selectedBoardID={ selectedBoardID }
                        userInfo={ userInfo }
                        deleteList={ this.onListDelete }
                        onBoardSelect={ this.onBoardSelect }
                        createNewList={ () => this.setState({ newListDialogOpened: true }) }
                        selectedBoardLists={ selectedBoardLists }
                    />: <LoadingPage />
                }
                <Dialog
                    open={newListDialogOpened}
                    title="Create new list"
                    close={ () => this.setState({ newListDialogOpened: false }) }
                    onSubmit={ () => this.createNewList(selectedBoardID, newListdata.name) }
                    footerActionLabel={"Create"}
                >
                    <label htmlFor="createListInput">Insert name for the list:</label>
                    <Input
                        type="text"
                        id={'createListInput'}
                        value={ newListdata.name }
                        onChange={(event) => {
                            newListObject.name = event.target.value;
                            this.setState({ newListdata: newListObject })
                        }}
                    />
                </Dialog>
            </>
        );
    }
}

export default App;
