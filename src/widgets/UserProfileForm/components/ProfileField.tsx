import type { UseFormRegisterReturn } from "react-hook-form";
import { SelectArrowIcon } from "@/src/shared";

type ProfileOption = {
    id: string;
    name: string;
};

type ProfileFieldBaseProps = {
    label: string;
    error?: string;
};

type ProfileTextFieldProps = ProfileFieldBaseProps & {
    id: string;
    registration: UseFormRegisterReturn;
};

type ProfileSelectFieldProps = ProfileFieldBaseProps & {
    id: string;
    options: ProfileOption[];
    registration: UseFormRegisterReturn;
};

type ProfileReadOnlyFieldProps = {
    label: string;
    value?: string | null;
};

const fieldWrapperClassName =
    "relative h-[53px] w-[410px] rounded-none border border-black/[0.23] bg-transparent";

const labelClassName =
    "absolute -top-[12px] left-[10px] z-10 bg-white px-1 text-[12px] font-normal leading-[23px] tracking-[0.15px] text-black/60";

const fieldTextClassName =
    "text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#2E2E2E]";

const inputClassName = `
    h-full
    w-full
    border-none
    bg-transparent
    px-3
    outline-none
    ${fieldTextClassName}
`;

const selectClassName = `
    h-full
    w-full
    appearance-none
    border-none
    bg-transparent
    px-3
    pr-10
    outline-none
    ${fieldTextClassName}
`;

const errorClassName = "mt-1 block text-xs text-red-500";

export const ProfileTextField = ({
                                     id,
                                     label,
                                     registration,
                                     error,
                                 }: ProfileTextFieldProps) => {
    return (
        <div>
            <div className={fieldWrapperClassName}>
                <label className={labelClassName} htmlFor={id}>
                    {label}
                </label>

                <input
                    id={id}
                    type="text"
                    className={inputClassName}
                    {...registration}
                />
            </div>

            {error && <span className={errorClassName}>{error}</span>}
        </div>
    );
};

export const ProfileSelectField = ({
                                       id,
                                       label,
                                       options,
                                       registration,
                                       error,
                                   }: ProfileSelectFieldProps) => {
    return (
        <div>
            <div className={fieldWrapperClassName}>
                <label className={labelClassName} htmlFor={id}>
                    {label}
                </label>

                <select
                    id={id}
                    className={selectClassName}
                    {...registration}
                >
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <span className="pointer-events-none absolute right-[14px] top-1/2 flex -translate-y-1/2 items-center justify-center">
                    <SelectArrowIcon />
                </span>
            </div>

            {error && <span className={errorClassName}>{error}</span>}
        </div>
    );
};

export const ProfileReadOnlyField = ({
                                         label,
                                         value,
                                     }: ProfileReadOnlyFieldProps) => {
    return (
        <div className={fieldWrapperClassName}>
            <span className={labelClassName}>{label}</span>

            <div
                className={`flex h-full w-full items-center px-3 ${fieldTextClassName}`}
            >
                {value || ""}
            </div>
        </div>
    );
};