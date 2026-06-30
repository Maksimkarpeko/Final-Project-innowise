"use client";

import Link from "next/link";
import { Button, Form } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { AuthTextField, PATH } from "@/src/shared";

import { useForgotPassword } from "../hooks/useForgotPassword";
import {
    forgotPasswordModel,
    ForgotPasswordFormValues,
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

export const ForgotPasswordForm = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        forgotPassword,
        isForgotPasswordLoading,
        forgotPasswordError,
    } = useForgotPassword();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        mode: "onChange",
        resolver: zodResolver(forgotPasswordModel),
        defaultValues: {
            email: "",
        },
    });

    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        setIsSuccess(false);
        setSubmitError(null);

        try {
            await forgotPassword(values.email);

            setIsSuccess(true);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to send email";

            setSubmitError(message);
        }
    };

    return (
        <Form className={authFormClassName} onFinish={handleSubmit(onSubmit)}>
            <h1 className={authTitleClassName}>Forgot password</h1>

            <p className={authSubtitleClassName}>
                We will sent you an email with further instructions
            </p>

            <div className={authFieldsClassName}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <AuthTextField
                            placeholder="example@email.com"
                            type="email"
                            required
                            {...field}
                        />
                    )}
                />

                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </div>

            {isSuccess && (
                <span className="mt-6 text-center text-sm text-green-600">
          Instructions have been sent to your email.
        </span>
            )}

            {(submitError || forgotPasswordError) && (
                <span className="mt-6 text-center text-sm text-red-500">
                    {submitError || forgotPasswordError?.message}
                </span>
            )}

            <div className={authActionsClassName}>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isForgotPasswordLoading}
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