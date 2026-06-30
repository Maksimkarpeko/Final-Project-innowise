"use client";

import { useMutation } from "@apollo/client/react";

import { RESET_PASSWORD } from "../api/auth.api";

import type {
    ResetPasswordResponse,
    ResetPasswordVariables,
} from "../model/auth.model";

export const useResetPassword = () => {
    const [resetPasswordMutation, { loading, error }] = useMutation<
        ResetPasswordResponse,
        ResetPasswordVariables
    >(RESET_PASSWORD);

    const resetPassword = (newPassword: string) => {
        return resetPasswordMutation({
            variables: {
                auth: {
                    newPassword,
                },
            },
        });
    };

    return {
        resetPassword,
        isResetPasswordLoading: loading,
        resetPasswordError: error,
    };
};