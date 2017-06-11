import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';

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

const filterReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => todoReducer(todo, action));

    default:
      return state;
  }
};

const reducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: filterReducer
});

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

const TodoList = ({todos, visibilityFilter}) => {
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

const FilterLink = ({filter, currentFilter, text}) => {
  if (filter === currentFilter) {
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

const VisibilityFilter = ({visibilityFilter}) => {
  return (
    <div>
      Show:
      <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter} text="All"/>
      <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter} text="ACTIVE"/>
      <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter} text="COMPLETED"/>
    </div>
  )
}

const TodoApp = () => {
  const {todos, visibilityFilter} = store.getState()
  return (
    <div>
      <AddTodo/>
      <TodoList todos={todos} visibilityFilter={visibilityFilter}/>
      <VisibilityFilter visibilityFilter={visibilityFilter}/>
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