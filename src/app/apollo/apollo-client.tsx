"use client";

import { ApolloLink, HttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { FC } from "react";
import { authLink } from "./authLink";
import { errorLink } from "./errorLink";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const link = ApolloLink.from([authLink, httpLink, errorLink]);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export const WrapperApollo: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApolloNextAppProvider makeClient={() => apolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
