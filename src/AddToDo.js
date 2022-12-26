import React, { Component } from 'react';

class AddToDo extends Component {
    state = {
        title: '',
        status: false,
        showAdd: false,
        showList: true,
        todos: {},
        tit: null,
        viewItem: null
    }

    // handleTitleChange = (event) => {
    //     this.setState({
    //         title: event.target.value
    //     })
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.onAdd({
    //         title: this.state.title,
    //         status: false
    //     })
    //     // this.setState({
    //     //     title: '',
    //     //     status: false
    //     // })
    // }

    onChangeContent = e => {
        this.setState({
            title: e.target.value
        })
    }

    onAdd = (e) => {
        console.log("add List");
        e.preventDefault();
        var data = { title: this.state.title };
        fetch(`http://localhost:4564/api/home`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(res => {
            // goi function cua todolist truyen vao
            this.props.closeAdd();
            this.props.getList();
            console.log(res);
        })
    }

    // openList = () => {
    //     this.setState({
    //         showAdd: !this.state.showAdd
    //         ,
    //         showList: true,
    //         showChoice: true
    //     })
    // }
    render() {
        return (
            <div className="addtodo">
                {/* <ToDoList ok={this.handleSubmit}></ToDoList> */}
                <h1>Add List</h1>
                <br />
                {/* <form onSubmit={this.handleSubmit}> */}
                {<form >
                    {/* {this.state.showAdd && <form onSubmit={this.props.openList}> */}
                    {/* <form onSubmit={this.props.openList}> */}
                    <div>
                        <input className="w3-input" placeholder="Get some ..." value={this.state.title} onChange={this.onChangeContent} />
                    </div>
                    <br />
                    <div>
                        {/* <button className="addtodo-button addtodo-add" onClick={this.props.openList} type="submit">Add</button> */}
                        <button className="addtodo__button addtodo__add" onClick={this.onAdd}>Add</button>
                        <button className="addtodo__button addtodo__cancel" onClick={this.props.closeAdd}>Cancel</button>
                    </div>
                </form>}
            </div >
        )
    };
}
export default AddToDo;