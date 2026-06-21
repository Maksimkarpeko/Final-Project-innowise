"use client";
import { ConfigProvider, Input } from "antd";
import { FC, useState } from "react";

interface FloatingInputProps {
  label: string;
  type?: string;
  disabled?: boolean;
  isPassword?: boolean;
  defaultValue?: string;
}

export const FloatingInput: FC<FloatingInputProps> = ({
  label,
  type = "text",
  disabled = false,
  isPassword = false,
  defaultValue = "",
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue);
  const InputComponent = isPassword ? Input.Password : Input;

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBgContainer: "#ffffff",
            colorBgContainerDisabled: "#ffffff",
            colorBorder: "#d9d9d9",
            colorText: "#000000",
            colorTextDisabled: "#8c8c8c",
            controlHeight: 50,
            borderRadius: 4,
            colorPrimaryHover: "#b0b0b0",
            colorPrimary: "#b4b4b4",
          },
        },
      }}
    >
      <div className="relative w-full" style={{ backgroundColor: "#ffffff" }}>
        <InputComponent
          type={type}
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ boxShadow: "none" }}
          {...rest}
        />

        <label
          style={{
            position: "absolute",
            left: "12px",
            top: "0",
            transform: "translateY(-50%)",
            fontSize: "12px",
            color: disabled ? "#8c8c8c" : "#888888",
            pointerEvents: "none",
            padding: "0 6px",
            backgroundColor: "#ffffff",

            zIndex: 10,
          }}
        >
          {label}
        </label>
      </div>
    </ConfigProvider>
  );
};
