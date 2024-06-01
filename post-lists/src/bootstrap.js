import { App } from "./App";

import React from "react";
import ReactDOM from "react-dom/client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/api/apollo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
