import React, {Component} from 'react';
import {connect} from 'react-redux';

const getFilteredTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const TodoList = ({todos, onTodoClick}) => {
  return (<ul>
    {todos.map(todo => {
      return <li key={todo.id}
                 onClick={() => onTodoClick(todo.id)}
                 style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</li>
    })}
  </ul>)
};

const mapStateToProps = (state) => ({
  todos: getFilteredTodos(state.todos, state.visibilityFilter)}
)

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: id => dispatch({type: 'TOGGLE_TODO', id})
})

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;