"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { FC } from "react";

const apolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.GRAPHQL_ENDPOINT,
    }),
  });

export const WrapperApollo: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApolloNextAppProvider makeClient={apolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
