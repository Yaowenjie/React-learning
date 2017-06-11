import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {reducer} from './reducers';

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

const TodoList = () => {
  const {todos, visibilityFilter} = store.getState()
  const getFilteredTodos = (todos, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_ACTIVE':
        return todos.filter(todo => !todo.completed);
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.completed)
    }
  }
  const filteredTodos = getFilteredTodos(todos, visibilityFilter);
  return (<ul>
    {filteredTodos.map(todo => {
      return <li key={todo.id}
                 onClick={() => {store.dispatch({type: 'TOGGLE_TODO', id: todo.id})}}
                 style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</li>
    })}
  </ul>)
};

const FilterLink = ({filter, text}) => {
  const {visibilityFilter} = store.getState()

  if (filter === visibilityFilter) {
    return (<span style={{marginRight: 8}}>{text}</span>)
  }

  return (
    <a href="#"
       style={{marginRight: 8}}
       onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    >
      {text}
    </a>)
}

const VisibilityFilter = () => {
  return (
    <div>
      Show:
      <FilterLink filter="SHOW_ALL" text="All"/>
      <FilterLink filter="SHOW_ACTIVE" text="ACTIVE"/>
      <FilterLink filter="SHOW_COMPLETED" text="COMPLETED"/>
    </div>
  )
}

const TodoApp = () => {
  return (
    <div>
      <AddTodo/>
      <TodoList/>
      <VisibilityFilter/>
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