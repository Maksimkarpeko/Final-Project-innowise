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
  placeholder:!text-[rgba(0,0,0,0.6)]
  hover:!border-[rgba(0,0,0,0.5)]
  focus:!border-[#c63031]
  focus:!shadow-none
  focus-within:!border-[#c63031]
  focus-within:!shadow-none
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
          <span className="flex h-6 w-6 items-center justify-center text-black">
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
