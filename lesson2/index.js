import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducers/index';
import AddTodo from './component/AddTodo';
import VisibleTodoList from './component/VisibleTodoList';
import VisibilityFilter from './component/VisibilityFilter';

const TodoApp = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <VisibilityFilter />
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