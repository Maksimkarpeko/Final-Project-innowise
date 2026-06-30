import { Form, Input } from "antd";

import type { CVDetailsFormValues } from "../../model/types";

type CvFormFieldProps = {
    label: string;
    name: keyof CVDetailsFormValues;
    variant?: "input" | "textarea";
};

const fieldClass = `
  relative
  w-full
  border
  border-[#CFCFCF]
  bg-transparent
  px-3
  pb-2
  pt-[18px]
  transition-colors

  focus-within:border-[#C63031]

  dark:border-white/20
  dark:bg-transparent
  dark:focus-within:border-[#D9363E]
`;

const labelClass = `
  absolute
  -top-[10px]
  left-3
  z-10
  bg-white
  px-1
  text-[12px]
  font-normal
  leading-[23px]
  tracking-[0.15px]
  text-black/60
  transition-colors

  dark:bg-[#303030]
  dark:text-white/60
`;

const inputClass = `
  !h-[23px]
  !w-full
  !bg-transparent
  !p-0
  text-[16px]
  font-normal
  !leading-[23px]
  tracking-[0.15px]
  !text-[#2E2E2E]
  shadow-none
  outline-none

  placeholder:!text-black/40
  dark:!text-white/90
  dark:placeholder:!text-white/40
`;

const textareaClass = `
  !min-h-[161px]
  !w-full
  !resize-none
  resize-none
  !bg-transparent
  !p-0
  text-[14px]
  font-normal
  !leading-[22px]
  tracking-[0.15px]
  !text-[#2E2E2E]
  shadow-none
  outline-none

  [&::-webkit-resizer]:hidden

  placeholder:!text-black/40
  dark:!text-white/90
  dark:placeholder:!text-white/40

  md:text-[16px]
  md:!leading-[23px]
`;

export const CvFormField = ({
                                label,
                                name,
                                variant = "input",
                            }: CvFormFieldProps) => {
    const isTextarea = variant === "textarea";

    return (
        <div className={`${fieldClass} ${isTextarea ? "min-h-[190px]" : "h-[53px]"}`}>
            <span className={labelClass}>{label}</span>

            <Form.Item name={name} noStyle>
                {isTextarea ? (
                    <Input.TextArea
                        variant="borderless"
                        autoSize={false}
                        className={textareaClass}
                        style={{
                            resize: "none",
                            cursor: "text",
                        }}
                    />
                ) : (
                    <Input variant="borderless" className={inputClass} />
                )}
            </Form.Item>
        </div>
    );
};