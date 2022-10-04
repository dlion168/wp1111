import React, { Component } from 'react';
import './App.css'
import cross from './img/x.png'
class App extends Component {
  constructor(props){
    super(props);
    this.state={item:0, undone:0, inputtext:"", todolist:[], displayMode:"all",displaylist:[], keynum:0}
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
    this.toggleTask = this.toggleTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }
  handleChange = (e)=>{
    this.setState({inputtext : e.target.value})
  }
  addTask = (e)=>{
    if (e.key==="Enter"){
      if (this.state.inputtext !== ""){
        this.setState((state)=>({todolist:[...state.todolist,{id:state.keynum, text:state.inputtext, done:false}]}))
        this.setState({inputtext:""})
        this.setState((state)=>({item:state.item+=1, undone:state.undone+=1, keynum:state.keynum+1}))
        if (displayMode ==="all" || displayMode==="Active"){
          this.setState((state)=>({displaylist:[...state.displaylist, {id:state.keynum, text:state.inputtext, done:false}]}))
        }
      }
    }
  }
  toggleTask = (e)=>{
    if (e.target.tagName === "INPUT"){
      this.setState((state)=>({
        undone : state.todolist.find((item)=>{return item.id === parseInt(e.target.id)}).done ? (state.undone+1):(state.undone-1),
      }))
      this.setState((state)=>({  
        todolist : state.todolist.map((obj)=> (obj.id === parseInt(e.target.id))? Object.assign(obj, { done: !obj.done}) : obj)
      }))
    }
  }
  deleteTask = (e)=>{
    this.setState((state)=>({
      undone : state.todolist.find((item)=>{item.id==e.target.id}).done ? (state.undone):(state.undone-1)
    }))
    this.setState((state)=>({
      item : state.item-1
    }))
    this.setState((state)=>({  
      todolist : state.todolist.splice(state.todolist.findIndex((item)=>{item.id==e.target.id}),1)
    }))
  }
  // filterActive = ()=>{
  //   this.
  // }

  render(){
    return (
    <div className="App">
        <header className="todo-app__header">
          <h1 className="todo-app__title">TODOs</h1>
        </header>
        <section className="todo-app__main">
          <input id="todo-input" className="todo-app__input" 
          placeholder="What needs to be done?" 
          onChange={this.handleChange} 
          onKeyDown={this.addTask}
          value={this.state.inputtext}/>
          <TodoList todolist={this.state.displaylist} toggle={this.toggleTask} delete={this.deleteTask} item={this.state.item}/>
        </section>
        <footer className="todo-app__footer" id="todo-footer" style={{
          display: (this.state.item>0)? "flex":"none",
        }}>
          <div className="todo-app__total">
            <span id="todo-count">{this.state.undone}</span>
             left
          </div>
          <ul className="todo-app__view-buttons">
            <li><button id="todo-all">All</button></li>
            <li><button id="todo-active" onClick={self.filterActive}>Active</button></li>
            <li><button id="todo-completed" onClick={self.filterComplete}>Completed</button></li>
          </ul>
          <div className="todo-app__clean">
            <button id="todo-clear-complete"> Clear completed </button>
          </div>
        </footer>
    </div>
    );
  }
}
const styles={ 
  Active: {
    textDecoration: 'line-through', 
    opacity: 0.5
  },
  Inactive: {
    textDecoration: 'none',
    opacity: 1
  },
}
class TodoList extends React.Component {
  render() {
    return (
      <ul id="todo-list" className="todo-app___list" style={{
        display: this.props.item>0? "block":"none",
      }}>
        {this.props.todolist.map(item => (
          <li className="todo-app__item" key={item.id}>
            <div className="todo-app__checkbox" onClick={this.props.toggle}>
              <input id={item.id} type="checkbox"/>
              <label htmlFor={item.id}></label>
            </div>
            <h1 className='todo-app__item-detail' style={item.done?styles.Active : styles.Inactive}>
              {item.text}
            </h1>
            <img src={cross} alt="cross" className='todo-app__item-x' onClick={this.props.delete}></img>
          </li>
        ))}
      </ul>
    );
  }
}
export default App 