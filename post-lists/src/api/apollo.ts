import { ApolloClient, InMemoryCache } from "@apollo/client";
const GRAPHQL = process.env.GRAPHQL_URL;

export const client = new ApolloClient({
  uri: GRAPHQL,
  cache: new InMemoryCache()
});
