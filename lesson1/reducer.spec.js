import expect from 'expect';
import reducer from './reducer';

describe('counter reducer test', () => {
  it('it should increase 1 when action is INCREMENT', () => {
    expect(reducer(0, {type: 'INCREMENT'})).toEqual(1);
  });

  it('it should decrease 1 when action is DECREMENT', () => {
    expect(reducer(1, {type: 'DECREMENT'})).toEqual(0);
  });
})
