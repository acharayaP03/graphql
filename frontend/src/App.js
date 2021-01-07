
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import BookList from './components/BookList';
import AddBook from './components/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main" id="main">
          <h1>GraphQL Book List </h1>
          <BookList />
          <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
