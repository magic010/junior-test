import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';

import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from 'crypto-hash';

import './index.css';
import { default as App } from './App/App.container';
import { resolvers, typeDefs } from './graphql/resolvers';
import { default as data } from './graphql/initial-data';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});
const persistedQueriesLink = createPersistedQueryLink({ sha256 });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: persistedQueriesLink.concat(httpLink),
  cache,
  typeDefs,
  resolvers
});

client.writeData({ data });

ReactDOM.render(
  <ApolloProvider client={client}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
