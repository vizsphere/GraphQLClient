import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://localhost:44318/graphql/', /* clone and run server from here https://github.com/vizzontech/GraphQLServer*/ 
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</ApolloProvider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
