import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const GRAPHQL = process.env.GRAPHQL_URL;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: user.accessToken ? `Bearer ${user.accessToken}` : ""
    }
  };
});

const httpLink = createHttpLink({
  uri: GRAPHQL
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
