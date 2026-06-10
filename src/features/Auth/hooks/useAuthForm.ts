import { useLazyQuery, useMutation } from "@apollo/client/react";
import { Login, SignUp } from "../api/auth.api";
import { AuthFormValues } from "../model/auth.model";
import { safeRefreshAccessToken } from "@/src/shared/utils/workOnToken";
import { AuthResponse, User } from "@/src/shared";
import { useRouter } from "next/navigation";
import { PATH } from "@/src/shared";

export const useAuthForm = () => {
  const navigate = useRouter();

  const [signUp, { loading: isSignUpLoading, error: signUpError }] =
    useMutation<{ signup: AuthResponse<User> }>(SignUp, {
      onCompleted: (data) => {
        if (data.signup) {
          safeRefreshAccessToken(
            data.signup.refresh_token,
            data.signup.access_token,
          );
          navigate.push(PATH.USER.LIST);
        }
      },
    });

  const [login, { loading: isLoginLoading, error: loginError }] = useLazyQuery<{
    login: AuthResponse<User>;
  }>(Login);

  const onSubmitSignUp = async (data: AuthFormValues) => {
    await signUp({
      variables: { email: data.email, password: data.password },
    });
  };

  const onSubmitLogin = async (data: AuthFormValues) => {
    const { data: loginData } = await login({
      variables: { email: data.email, password: data.password },
    });

    if (loginData) {
      safeRefreshAccessToken(
        loginData.login.refresh_token,
        loginData.login.access_token,
      );
      navigate.push(PATH.USER.LIST);
    }
  };

  return {
    onSubmitSignUp,
    onSubmitLogin,
    isSignUpLoading,
    signUpError,
    isLoginLoading,
    loginError,
  };
};
