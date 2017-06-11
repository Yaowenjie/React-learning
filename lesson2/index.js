import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducers';

let nextTodoId = 0;
const AddTodo = (props, {store}) => {
  let input;
  return (
    <div>
      <input type="text" ref={node => { input = node }} />
      <button onClick={() => {store.dispatch({type: 'ADD_TODO', id: nextTodoId++, text: input.value}); input.value = ''}}>AddTodo</button>
    </div>
    )
};

AddTodo.contextTypes = {
  store: React.PropTypes.object
};

const getFilteredTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
  }
};

class TodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {store} = this.context;
    const {todos, visibilityFilter} = store.getState();
    const filteredTodos = getFilteredTodos(todos, visibilityFilter);

    return (<ul>
      {filteredTodos.map(todo => {
        return <li key={todo.id}
                   onClick={() => {store.dispatch({type: 'TOGGLE_TODO', id: todo.id})}}
                   style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</li>
      })}
    </ul>)
  }
};

TodoList.contextTypes = {
  store: React.PropTypes.object
};

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {filter, text} = this.props
    const {store} = this.context
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
};

FilterLink.contextTypes = {
  store: React.PropTypes.object
};

const VisibilityFilter = () => {
  return (
    <div>
      Show:
      <FilterLink filter="SHOW_ALL" text="All"/>
      <FilterLink filter="SHOW_ACTIVE" text="Active"/>
      <FilterLink filter="SHOW_COMPLETED" text="Completed"/>
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
  render(
    <Provider store={createStore(reducer)}>
      <TodoApp />
    </Provider>,
    document.getElementById('todoApp'))
};

renderApp();