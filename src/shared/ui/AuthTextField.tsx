"use client";

import { Input, InputProps } from "antd";
import { EyeIcon } from "./EyeIcon";

type AuthTextFieldProps = InputProps & {
  placeholder: string;
  type?: "text" | "password" | "email";
};

const fieldClassName = `
  !h-[48px]
  !w-full
  !rounded-[4px]
  !border
  !border-[rgba(0,0,0,0.23)]
  !bg-transparent
  !px-[12px]
  !py-0
  !text-[16px]
  !font-normal
  !leading-[23px]
  !tracking-[0.15px]
  !text-[#2e2e2e]
  !shadow-none

  placeholder:!text-[#BDBDBD]

  hover:!border-[rgba(0,0,0,0.5)]
  focus:!border-[#c63031]
  focus:!shadow-none
  focus-within:!border-[#c63031]
  focus-within:!shadow-none

  dark:!border-white/20
  dark:!text-white/90
  dark:placeholder:!text-white/60
  dark:hover:!border-white/30
  dark:focus:!border-[#D9363E]
  dark:focus-within:!border-[#D9363E]

  [&_.ant-input]:!bg-transparent
  [&_.ant-input]:!text-[#2e2e2e]
  [&_.ant-input::placeholder]:!text-[#BDBDBD]

  dark:[&_.ant-input]:!text-white/90
  dark:[&_.ant-input::placeholder]:!text-white/60

  [&_.ant-input-password-icon]:!text-black
  dark:[&_.ant-input-password-icon]:!text-white/60
`;

export const AuthTextField = ({
                                placeholder,
                                type = "text",
                                ...rest
                              }: AuthTextFieldProps) => {
  if (type === "password") {
    return (
        <Input.Password
            placeholder={placeholder}
            className={fieldClassName}
            iconRender={() => (
                <span className="flex h-6 w-6 items-center justify-center text-black dark:text-white/60">
                  <EyeIcon />
                </span>
            )}
            {...rest}
        />
    );
  }

  return (
      <Input
          placeholder={placeholder}
          className={fieldClassName}
          type={type}
          {...rest}
      />
  );
};