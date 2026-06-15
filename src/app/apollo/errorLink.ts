import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client";
import { getRefreshToken } from "@/src/shared/api/getRefreshToken";
import { CombinedGraphQLErrors } from "@apollo/client";

export const errorLink = onError(({ error, operation, forward }) => {
  if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((err) => err.message === "Unauthorized")
  ) {
    return new Observable((observer) => {
      getRefreshToken()
        .then((newToken) => {
          console.log(newToken);
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${newToken}`,
            },
          }));

          forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch((err) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          observer.error(err);
        });
    });
  }
});
