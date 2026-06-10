"use client";
import { AuthPanelProps } from "@/src/shared";
import { AuthHeader } from "./AuthHeader";
import { AuthForm } from '@/src/features';

export const AuthPanel = ({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  secondaryLinkHref,
}: AuthPanelProps) => {
  return (
    <>
      <AuthHeader />
      <section className="flex justify-center px-4">
        <AuthForm
          title={title}
          subtitle={subtitle}
          primaryButtonText={primaryButtonText}
          secondaryButtonText={secondaryButtonText}
          secondaryLinkHref={secondaryLinkHref}
        />
      </section>
    </>
  );
};
