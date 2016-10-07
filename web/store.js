import { createStore } from 'redux';
import reducers from './reducers/reducers';

const store = createStore(reducers, window.initialState);
export default store;
