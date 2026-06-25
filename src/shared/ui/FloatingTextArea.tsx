"use client";
import { ConfigProvider, Input } from "antd";
import { FC, useState } from "react";

const { TextArea } = Input;

interface FloatingInputProps {
  label: string;
  type?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export const FloatingTextArea: FC<FloatingInputProps> = ({
  label,
  disabled = false,
  defaultValue = "",
  ...rest
}) => {
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
        <TextArea rows={4} {...rest} defaultValue={defaultValue} />

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
