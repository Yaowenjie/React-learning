import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';


const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      }
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        return todoReducer(todo, action)
      });

    default:
      return state;
  }
}

let store = createStore(reducer);

let nextTodoId = 0;
class AddTodo extends Component {
  render() {
    return <div>
      <input type="text" ref={node => { this.input = node }} />
      <button onClick={() => {store.dispatch({type: 'ADD_TODO', id: nextTodoId++, text: this.input.value}); this.input.value = ''}}>AddTodo</button>
    </div>
  }
}

const TodoList = ({todos}) => {
  return (<ul>
    {todos.map(todo => {
      return <li key={todo.id}
                 onClick={() => {store.dispatch({type: 'TOGGLE_TODO', id: todo.id})}}
                 style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</li>
    })}
  </ul>)
};

const TodoApp = () => {
  return (
    <div>
      <AddTodo/>
      <TodoList todos={store.getState()}/>
    </div>
  )
};

const renderApp = () => {
  console.log(store.getState());
  render(<TodoApp />, document.getElementById('todoApp'))
};

store.subscribe(
  renderApp
);
renderApp();