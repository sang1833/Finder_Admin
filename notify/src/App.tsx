import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/api/apollo";
import "./index.css";
import Notify from "./app/Notify";

export function App() {
  return (
    <ApolloProvider client={client}>
      <Notify />
    </ApolloProvider>
  );
}
