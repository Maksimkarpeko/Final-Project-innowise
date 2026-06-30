"use client";

import Link from "next/link";
import { Button, Form } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthTextField, PATH } from "@/src/shared";

import { useResetPassword } from "../hooks/useResetPassword";
import {
    resetPasswordModel,
    ResetPasswordFormValues,
} from "../model/auth.model";

import {
    authActionsClassName,
    authFieldsClassName,
    authFormClassName,
    authSubtitleClassName,
    authTitleClassName,
    primaryButtonClassName,
    secondaryLinkClassName,
} from "./authFormClasses";

export const ResetPasswordForm = () => {
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);

    const { resetPassword, isResetPasswordLoading, resetPasswordError } =
        useResetPassword();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        mode: "onChange",
        resolver: zodResolver(resetPasswordModel),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: ResetPasswordFormValues) => {
        setIsSuccess(false);

        await resetPassword(values.newPassword);

        setIsSuccess(true);

        setTimeout(() => {
            router.push(PATH.AUTH.LOGIN);
        }, 1200);
    };

    return (
        <Form className={authFormClassName} onFinish={handleSubmit(onSubmit)}>
            <h1 className={authTitleClassName}>Reset password</h1>

            <p className={authSubtitleClassName}>
                Enter your new password and confirm it
            </p>

            <div className={authFieldsClassName}>
                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                        <AuthTextField
                            placeholder="New password"
                            type="password"
                            required
                            {...field}
                        />
                    )}
                />

                {errors.newPassword && (
                    <span className="text-red-500">{errors.newPassword.message}</span>
                )}

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <AuthTextField
                            placeholder="Confirm password"
                            type="password"
                            required
                            {...field}
                        />
                    )}
                />

                {errors.confirmPassword && (
                    <span className="text-red-500">
            {errors.confirmPassword.message}
          </span>
                )}
            </div>

            {isSuccess && (
                <span className="mt-6 text-center text-sm text-green-600">
          Password has been updated.
        </span>
            )}

            {resetPasswordError && (
                <span className="mt-6 text-center text-sm text-red-500">
          {resetPasswordError.message}
        </span>
            )}

            <div className={authActionsClassName}>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isResetPasswordLoading}
                    className={primaryButtonClassName}
                >
                    Reset password
                </Button>

                <Link href={PATH.AUTH.LOGIN} className={secondaryLinkClassName}>
                    Cancel
                </Link>
            </div>
        </Form>
    );
};