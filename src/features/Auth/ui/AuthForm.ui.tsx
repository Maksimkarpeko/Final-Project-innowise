"use client";

import Link from "next/link";
import { Button, Form } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import {
  AuthTextField,
  AuthPanelProps,
  PATH,
  useLocale,
} from "@/src/shared";
import { createAuthFormModel, AuthFormValues } from "../model/auth.model";
import { useAuthForm } from "../hooks/useAuthForm";

import {
  authActionsClassName,
  authFieldsClassName,
  authFormClassName,
  authSubtitleClassName,
  authTitleClassName,
  primaryButtonClassName,
  secondaryLinkClassName,
} from "./authFormClasses";

export const AuthForm = ({
                           title,
                           subtitle,
                           primaryButtonText,
                           secondaryButtonText,
                           secondaryLinkHref,
                         }: AuthPanelProps) => {
  const pathname = usePathname();
  const { t } = useLocale();
  const authFormModel = useMemo(() => createAuthFormModel(t), [t]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthFormValues>({
    mode: "onChange",
    resolver: zodResolver(authFormModel),
  });

  const {
    loginError,
    isLoginLoading,
    onSubmitLogin,
    onSubmitSignUp,
    signUpError,
    isSignUpLoading,
  } = useAuthForm();

  const isSignUpActive = pathname === PATH.AUTH.REGISTER;

  return (
      <Form
          className={authFormClassName}
          onFinish={handleSubmit(isSignUpActive ? onSubmitSignUp : onSubmitLogin)}
      >
        <h1 className={authTitleClassName}>{title}</h1>

        <p className={authSubtitleClassName}>{subtitle}</p>

        <div className={authFieldsClassName}>
          <Controller
              name="email"
              control={control}
              render={({ field }) => (
                  <AuthTextField
                      placeholder={t.auth.form.emailPlaceholder}
                      type="email"
                      required
                      {...field}
                  />
              )}
          />

          {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
          )}

          <Controller
              name="password"
              control={control}
              render={({ field }) => (
                  <AuthTextField
                      placeholder={t.auth.form.passwordPlaceholder}
                      type="password"
                      required
                      {...field}
                  />
              )}
          />

          {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className={authActionsClassName}>
          <Button
              type="primary"
              htmlType="submit"
              loading={isSignUpLoading || isLoginLoading}
              className={primaryButtonClassName}
          >
            {primaryButtonText}
          </Button>

          <Link href={secondaryLinkHref} className={secondaryLinkClassName}>
            {secondaryButtonText}
          </Link>
        </div>

        {(isSignUpLoading || isLoginLoading) && (
            <span className="text-blue-500">{t.common.loading}</span>
        )}

        {(signUpError || loginError) && (
            <span className="text-red-500">
          {signUpError?.message || loginError?.message}
        </span>
        )}
      </Form>
  );
};