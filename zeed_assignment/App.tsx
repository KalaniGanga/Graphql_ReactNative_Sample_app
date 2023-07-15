import React from "react";
import { Provider } from "react-native-paper";
import App from "./src/navigation";
import { theme } from "./src/core/theme";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

const Main = () => (
  <Provider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);

export default Main;
