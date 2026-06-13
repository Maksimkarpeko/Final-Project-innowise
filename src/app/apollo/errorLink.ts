import { getRefreshToken } from "@/src/shared/api/getRefreshToken";
import { ErrorLink } from "@apollo/client/link/error";
import { apolloClient } from "./apollo-client";
import { Observable } from 'rxjs';

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (
    error instanceof Error &&
    "statusCode" in error &&
    error.statusCode === 401
  ) {
    return new Observable((observer) => {
      getRefreshToken(apolloClient)
        .then(() => {
          forward(operation).subscribe(observer);
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }
});
