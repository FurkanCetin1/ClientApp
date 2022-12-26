import React, { Component } from "react";
import AddToDo from "./AddToDo";
import TodoItems from "./Component/TodoItems";

class ToDoList extends Component {
  state = {
    todos: {},
    showAdd: false,
    showList: true,
    showChoice: true,
    tit: null,
    data: null,
    viewItem: null,
  };

  componentDidMount() {
    this.getList();
  }

  closeAdd = () => {
    this.setState({
      showAdd: false,
      showList: true,
      showChoice: true,
    });
  };

  onItemClick(item) {
    return (event) => {
      const status = item.status;
      const { todos } = this.state;
      const index = todos.indexOf(item);
      this.setState({
        todos: [
          ...todos.slice(0, index),
          {
            ...item,
            status: !status,
          },
          ...todos.slice(index + 1),
        ],
      });
    };
  }
  showClickAdd = () => {
    this.setState({
      showAdd: !this.state.showAdd,
      showList: false,
      showChoice: false,
    });
  };
  showClickButton = () => {
    this.setState({
      showList: !this.state.showList,
      showChoice: true,
    });
  };
  showButton = () => {
    return (
      <div className="showButton">
        <div className="showButton__choice">To Do List</div>
        <div className="showButton__choice" onClick={() => this.showClickAdd()}>
          <i class="fas fa-plus"></i>
        </div>
        <div
          className="showButton__choice"
          onClick={() => this.showClickButton()}
        >
          <i class="fas fa-list-ul"></i>
        </div>
      </div>
    );
  };
  show = () => {
    if (this.state.showChoice === true) {
      return this.showButton();
    } else {
      return "";
    }
  };
  getList = () => {
    fetch("http://localhost:5091/api/agendaitem", {
      method: "GET",
      withCredentials: true,
      crossorigin: true,
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ todos: res, tit: res });
        //console.log(res);
      });
  };
  getItem = (id) => {
    fetch(`http://localhost:5091/api/agendaitem/${id}`, {
      method: "GET",
      withCredentials: true,
      crossorigin: true,
    })
      .then((res) => res.json())
      .then((res) => this.setState({ viewItem: res }));
  };

  onChangeContent = (e) => {
    this.setState({
      viewItem: { ...this.state.viewItem, title: e.target.value },
    });
  };

  onDelete = () => {
    var data = this.state.viewItem;
    fetch(`http://localhost:5091/api/agendaitem/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      crossorigin: true,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
      });
  };
  onSubmitUpdate = () => {
    var data = this.state.viewItem;
    fetch(`http://localhost:5091/api/agendaitem/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      crossorigin: true,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
      });
  };
  render() {
    const { todos } = this.state;

    return (
      <React.Fragment>
        {this.state.showAdd && (
          <AddToDo closeAdd={this.closeAdd} getList={this.getList}></AddToDo>
        )}

        {this.show()}

        <div className="items">
          {this.state.showList &&
            todos.length &&
            todos.map((item, index) => {
              return (
                <TodoItems
                  key={index}
                  item={item}
                  getList={this.getList}
                  onClick={this.onItemClick(item)}
                />
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
export default ToDoList;
