"use client";

import { useMutation } from "@apollo/client/react";

import { FORGOT_PASSWORD } from "../api/auth.api";

import type {
    ForgotPasswordResponse,
    ForgotPasswordVariables,
} from "../model/auth.model";

export const useForgotPassword = () => {
    const [forgotPasswordMutation, { loading, error }] = useMutation<
        ForgotPasswordResponse,
        ForgotPasswordVariables
    >(FORGOT_PASSWORD);

    const forgotPassword = (email: string) => {
        return forgotPasswordMutation({
            variables: {
                auth: {
                    email,
                },
            },
        });
    };

    return {
        forgotPassword,
        isForgotPasswordLoading: loading,
        forgotPasswordError: error,
    };
};