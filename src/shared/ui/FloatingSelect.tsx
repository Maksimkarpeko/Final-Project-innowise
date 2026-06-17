import React, { FC } from "react";
import { ConfigProvider, Select } from "antd";

interface FloatingSelectProps {
  label: string;
  defaultValue?: string;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[];
  onChange?: (value: string) => void;
}

export const FloatingSelect: FC<FloatingSelectProps> = ({
  label,
  defaultValue,
  disabled = false,
  options,
  onChange,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorBgContainer: "#ffffff",
            colorBgContainerDisabled: "#ffffff",
            colorBorder: "#d9d9d9",
            controlHeight: 50,
            borderRadius: 4,
            colorPrimaryHover: "#dfdfdf",
            colorPrimary: "#bcbcbc",
          },
        },
      }}
    >
      <div className="relative w-full" style={{ backgroundColor: "#ffffff" }}>
        <Select
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          options={options}
          style={{ width: "100%", boxShadow: "none" }}
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
