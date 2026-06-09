"use client";

import Link from "next/link";
import { Button, Form } from "antd";
import { AuthTextField } from "@/src/widgets/Auth/ui/AuthTextField";

type AuthPanelProps = {
    title: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    secondaryLinkHref: string;
};

const primaryButtonClassName = `
  !h-12
  !w-full
  !rounded-[40px]
  !border-0
  !bg-[#c63031]
  !text-sm
  !font-medium
  !uppercase
  !leading-[24.5px]
  !tracking-[0.4px]
  !text-white
  !shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)]
  hover:!bg-[#b92b2c]
`;

const secondaryLinkClassName = `
  flex
  h-[48px]
  w-full
  items-center
  justify-center
  rounded-[40px]
  p-0
  [font-family:Roboto,sans-serif]
  !text-[14px]
  !font-medium
  !uppercase
  !leading-[24.5px]
  !tracking-[0.4px]
  !text-[#767676]
  !no-underline
  hover:!text-[#767676]
  hover:!no-underline
  visited:!text-[#767676]
`;

export const AuthPanel = ({
                              title,
                              subtitle,
                              primaryButtonText,
                              secondaryButtonText,
                              secondaryLinkHref,
                          }: AuthPanelProps) => {
    return (
        <section className="flex justify-center px-4">
            <Form className="flex min-h-[calc(100dvh-56px)] w-full max-w-[560px] flex-col items-center justify-center">
                <h1 className="m-0 text-center text-[28px] font-normal leading-9 tracking-[0.25px] text-[#2e2e2e] sm:text-[32px] sm:leading-10 lg:text-[34px] lg:leading-[42px]">
                    {title}
                </h1>

                <p className="mt-6 mb-0 max-w-[520px] text-center text-sm leading-[22px] text-[#2e2e2e] sm:text-base sm:leading-6">
                    {subtitle}
                </p>

                <div className="mt-10 flex w-full flex-col gap-5">
                    <AuthTextField placeholder="Почта" />
                    <AuthTextField placeholder="Пароль" type="password" />
                </div>

                <div className="mt-[60px] flex w-full max-w-[220px] flex-col gap-2">
                    <Button
                        type="primary"
                        htmlType="button"
                        className={primaryButtonClassName}
                    >
                        {primaryButtonText}
                    </Button>

                    <Link href={secondaryLinkHref} className={secondaryLinkClassName}>
                        {secondaryButtonText}
                    </Link>
                </div>
            </Form>
        </section>
    );
};