"use client";

import { Input } from "antd";
import type { InputProps } from "antd";
import { FC } from "react";

interface FloatingInputProps extends InputProps {
    label: string;
    isPassword?: boolean;
}

const inputClassName = `
  h-[50px]!
  w-full!
  rounded-[4px]!
  border-[#d9d9d9]!
  bg-white!
  px-[12px]!
  font-roboto!
  text-[16px]!
  font-normal!
  text-[#2e2e2e]!
  shadow-none!
  outline-none!
  transition-colors!

  placeholder:!text-[#767676]

  hover:border-[#bdbdbd]!
  focus:border-[#D9363E]!

  disabled:cursor-default!
  disabled:border-[#d9d9d9]!
  disabled:bg-white!
  disabled:text-[#8c8c8c]!

  dark:border-white/20!
  dark:bg-[#303030]!
  dark:text-white/90!
  dark:placeholder:!text-white/40!

  dark:hover:border-white/30!
  dark:focus:border-[#D9363E]!

  dark:disabled:border-white/20!
  dark:disabled:bg-[#303030]!
  dark:disabled:text-white/45!

  [&_.ant-input]:!bg-transparent
  [&_.ant-input]:!text-[#2e2e2e]
  dark:[&_.ant-input]:!text-white/90

  [&_.ant-input::placeholder]:!text-[#767676]
  dark:[&_.ant-input::placeholder]:!text-white/40

  [&_.ant-input-password-icon]:!text-[#767676]
  dark:[&_.ant-input-password-icon]:!text-white/60
`;

export const FloatingInput: FC<FloatingInputProps> = ({
                                                          label,
                                                          type = "text",
                                                          disabled = false,
                                                          isPassword = false,
                                                          defaultValue = "",
                                                          className = "",
                                                          ...rest
                                                      }) => {
    const InputComponent = isPassword ? Input.Password : Input;

    return (
        <div className="relative w-full bg-white transition-colors dark:bg-[#303030]">
            <InputComponent
                type={isPassword ? undefined : type}
                disabled={disabled}
                defaultValue={defaultValue}
                className={`${inputClassName} ${className}`}
                {...rest}
            />

            <label
                className={`
          pointer-events-none
          absolute
          left-[12px]
          top-0
          z-10
          -translate-y-1/2
          bg-white
          px-[6px]
          text-[12px]
          font-normal
          leading-[18px]
          text-[#888888]
          transition-colors

          dark:bg-[#303030]
          dark:text-white/60

          ${disabled ? "text-[#8c8c8c] dark:text-white/45" : ""}
        `}
            >
                {label}
            </label>
        </div>
    );
};