import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import { combineReducers } from 'redux';
  // const reducer = combineReducers({
  //   // here we will be adding reducers
  //     counter: counterReducer, 
  // })
  const store = configureStore({
    reducer: {
      counter: counterReducer, 
    }
  })
  console.log(store.getState());
  export default store;