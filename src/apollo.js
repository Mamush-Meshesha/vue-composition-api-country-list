import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const HttpLink = createHttpLink({
  uri: "https://climbing-corgi-98.hasura.app/v1/graphql/",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret":
        "QvOiic6nGQ6vGQf3OGIQhJBUWyHXFFCvBH4P6iaETkSNUx0Eeot5QAJSCgXV3X9i",
    },
  };
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: authLink.concat(HttpLink),
  cache: new InMemoryCache(),
});

export { apolloClient, authLink };
