import React from 'react';
import ReactDom from 'react-dom';
import reducer from './reducer';
import { createStore } from 'redux';

const store = createStore(reducer);

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const renderCounter = () => {
  ReactDom.render(
    <Counter
      value={store.getState()}
       onIncrement={()=>
        store.dispatch({
            type: 'INCREMENT'
          })
      }
       onDecrement={()=>
        store.dispatch({
            type: 'DECREMENT'
          })
      } />
  , document.getElementById("counter"));
};

store.subscribe(renderCounter);
renderCounter();
