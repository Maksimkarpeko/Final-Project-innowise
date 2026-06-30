"use client";

import { Select } from "antd";
import type { SelectProps } from "antd";
import { ChevronDown } from "lucide-react";
import { FC } from "react";

interface FloatingSelectProps
    extends Omit<
        SelectProps<string>,
        "options" | "onChange" | "value" | "defaultValue" | "disabled"
    > {
    label: string;
    defaultValue?: string;
    value?: string;
    disabled?: boolean;
    locked?: boolean;
    options: { value: string; label: string; disabled?: boolean }[];
    onChange?: (value: string) => void;
}

export const FloatingSelect: FC<FloatingSelectProps> = ({
                                                            label,
                                                            defaultValue,
                                                            value,
                                                            disabled = false,
                                                            locked = false,
                                                            options,
                                                            onChange,
                                                            className = "",
                                                            ...rest
                                                        }) => {
    const currentValue = value ?? defaultValue ?? "";

    if (locked) {
        return (
            <div className="relative w-full bg-white transition-colors dark:bg-[#303030]">
                <div
                    className="
            flex
            h-[50px]
            w-full
            items-center
            justify-between
            rounded-[4px]
            border
            border-[#d9d9d9]
            bg-white
            px-[12px]
            font-roboto
            text-[16px]
            font-normal
            text-[#8c8c8c]
            transition-colors
            dark:border-white/20
            dark:bg-[#303030]
            dark:text-white/45
          "
                >
                    <span>{currentValue}</span>

                    <ChevronDown
                        size={20}
                        strokeWidth={1.8}
                        className="text-[#8c8c8c] dark:text-white/35"
                    />
                </div>

                <label
                    className="
            pointer-events-none
            absolute
            left-[12px]
            top-0
            z-10
            -translate-y-1/2
            bg-white
            px-[6px]
            text-[12px]
            text-[#888888]
            transition-colors
            dark:bg-[#303030]
            dark:text-white/60
          "
                >
                    {label}
                </label>
            </div>
        );
    }

    return (
        <div className="relative w-full bg-white transition-colors dark:bg-[#303030]">
            <Select
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={onChange}
                options={options}
                suffixIcon={
                    <ChevronDown
                        size={20}
                        strokeWidth={1.8}
                        className="text-[#767676] dark:text-white/60"
                    />
                }
                className={`
          h-[50px]!
          w-full!

          [&_.ant-select-selector]:!h-[50px]
          [&_.ant-select-selector]:!rounded-[4px]
          [&_.ant-select-selector]:!border-[#d9d9d9]
          [&_.ant-select-selector]:!bg-white
          [&_.ant-select-selector]:!px-[12px]
          [&_.ant-select-selector]:!shadow-none
          [&_.ant-select-selector]:!outline-none

          dark:[&_.ant-select-selector]:!border-white/20
          dark:[&_.ant-select-selector]:!bg-[#303030]

          [&_.ant-select-selection-item]:!flex
          [&_.ant-select-selection-item]:!items-center
          [&_.ant-select-selection-item]:!font-roboto
          [&_.ant-select-selection-item]:!text-[16px]
          [&_.ant-select-selection-item]:!font-normal
          [&_.ant-select-selection-item]:!text-[#2e2e2e]
          dark:[&_.ant-select-selection-item]:!text-white/90

          [&_.ant-select-selection-placeholder]:!text-[#767676]
          dark:[&_.ant-select-selection-placeholder]:!text-white/40

          [&_.ant-select-arrow]:!text-[#767676]
          dark:[&_.ant-select-arrow]:!text-white/60

          [&.ant-select-disabled_.ant-select-selector]:!bg-white
          [&.ant-select-disabled_.ant-select-selection-item]:!text-[#8c8c8c]
          dark:[&.ant-select-disabled_.ant-select-selector]:!bg-[#303030]
          dark:[&.ant-select-disabled_.ant-select-selection-item]:!text-white/45

          ${className}
        `}
                popupClassName="
          bg-white
          dark:bg-[#303030]

          [&_.ant-select-item]:!text-[#2e2e2e]
          dark:[&_.ant-select-item]:!text-white/80

          [&_.ant-select-item-option-active]:!bg-black/5
          dark:[&_.ant-select-item-option-active]:!bg-white/10

          [&_.ant-select-item-option-selected]:!bg-black/10
          dark:[&_.ant-select-item-option-selected]:!bg-white/15
        "
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