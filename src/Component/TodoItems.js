import React, { Component } from "react";
import classNames from "classnames";
import "./TodoItems.css";
import circleImg from "../img/circle.svg";
import tickImg from "../img/tick.svg";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // todos: [
      //     { title: '', status: true }
      // ],
      title: "",
      todos: {},
      tit: null,
      viewItem: null,
      showListEdit: true,
    };
  }
  deleteToDo = (todo) => {
    const filtereditems = this.state.todos.filter(
      (x) => x.title !== todo.title
    );
    this.setState({
      todos: filtereditems,
    });
  };

  editToDo = (x) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.title === x.title) {
          return {
            ...todo,
            status: todo.status === true ? false : true,
          };
        } else {
          return todo;
        }
      }),
    }));
  };

  getItem = (id) => {
    fetch(`http://localhost:5091/api/agendaitem/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ viewItem: res, showListEdit: true }));
  };

  onChangeContent = (e) => {
    this.setState({
      viewItem: { ...this.state.viewItem, title: e.target.value },
    });
  };
  onAdd = () => {
    var data = this.state.viewItem;
    fetch(`http://localhost:5091/api/agendaitem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  onDelete = (e) => {
    console.log("delete List");
    e.preventDefault();
    var data = this.state.viewItem;
    fetch(`http://localhost:5091/api/agendaitem/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ showListEdit: !this.state.showListEdit }, () => {
          this.props.getList();
        });
        console.log(res);
      });
  };

  onSubmitUpdate = (e) => {
    console.log("update List");
    e.preventDefault();

    var data = this.state.viewItem;
    fetch(`http://localhost:5091/api/agendaitem/${data.id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ showListEdit: !this.state.showListEdit }, () => {
          this.props.getList();
        });
        console.log(res);
      });
  };
  render() {
    console.log("todo item");
    console.log(this.props.item);
    const { item, onClick } = this.props;
    let url = circleImg;
    if (item.status) {
      url = tickImg;
    }
    // var totoItem = this.props.item;
    return (
      <React.Fragment>
        <div
          className={classNames("todoItems", {
            "todoItems-done": item.status,
          })}
        >
          <div className=" row">
            <div className="col-md-10">
              {
                <img
                  onClick={onClick}
                  alt="x"
                  src={url}
                  width={40}
                  height={40}
                />
              }
              {item.description}
            </div>
            <div className="col-md-1" onClick={() => this.getItem(item.id)}>
              <i class="fas fa-star"></i>
            </div>
          </div>
          {/* <form> */}
          <form>
            <div>
              {this.state.showListEdit && this.state.viewItem && (
                <React.Fragment>
                  <input
                    defaultValue={this.state.viewItem.title}
                    onChange={this.onChangeContent}
                  ></input>
                  <span onClick={this.onSubmitUpdate}>
                    <i class="fas fa-edit" aria-hidden="true"></i>
                  </span>
                  <span onClick={this.onDelete}>
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                  </span>
                </React.Fragment>
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default TodoItems;
