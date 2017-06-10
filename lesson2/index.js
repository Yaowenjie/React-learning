import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
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
      <button onClick={() => {store.dispatch({type: 'ADD_TODO', id: nextTodoId++, text: this.input.value})}}>AddTodo</button>
    </div>
  }
}

const TodoList = ({todos}) => {
  return (<ul>
    {todos.map(todo => {
      return <li key={todo.id}>{todo.text}</li>
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