import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export default function configureStore() {

  const composeEnhancers = compose;
  const enhancer = composeEnhancers(
      applyMiddleware(
          thunk,
      )
  )

  return createStore(reducer, {}, enhancer)
}
