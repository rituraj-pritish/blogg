import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import ApolloClient from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import reducers from 'src/redux/reducers';
import App from 'src/components/app/App';

const token = window.localStorage.getItem('token');

//graphql setup
const link = createUploadLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? '/graphql'
      : 'http://localhost:5000/graphql',
  headers: {
    authorization: token ? token : ''
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

//store setup
const middlewares = [reduxThunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(reducers, devTools);

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(axe => {
    // axe.default(React, ReactDOM, 1000);
    render();
  });
} else {
  render();
}
