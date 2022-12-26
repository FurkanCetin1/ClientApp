import React, { Component } from 'react';
import ToDoList from '../ToDoList';
class List extends Component {
    render() {
        return (
            <div className="list ">
                <ToDoList />
            </div>
        )
    };
}
export default List;