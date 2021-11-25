import React from 'react';
import { View, Text,Alert } from 'react-native';
import Counter from '../Components/Counter';
import { createStore } from 'redux';
import counterReducer from '../Reducers/counterReducer';

const store = createStore(counterReducer);

const Home = () => {
  return (
    <Counter
      value={store.getState()}
      onIncrement={store.dispatch({ type: 'INCREMENT' })}
      onDecrement={store.dispatch({ type: 'DECREMENT' })}
    />
  );
};

export default Home;
