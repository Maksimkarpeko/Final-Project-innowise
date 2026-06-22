"use client";

import { useEffect, useState } from "react";

import { Alert, Form, Input, Spin } from "antd";

import { useCVDetails } from "../hooks/useCVDetails";
import { CVDetails, CVDetailsFormValues } from "../model/types";

type CVDetailsFormProps = {
    cvId: string;
};

type CVDetailsFormContentProps = {
    cv: CVDetails;
    isUpdating: boolean;
    updateCVDetails: (values: CVDetailsFormValues) => Promise<unknown>;
};

type CVTextFieldProps = {
    label: string;
    name: keyof CVDetailsFormValues;
};

const fieldBaseClass =
    "relative w-full border border-[#CFCFCF] bg-transparent px-3 pb-2 pt-[18px]";

const labelClass =
    "absolute -top-[10px] left-3 z-10 bg-[#F5F5F7] px-1 text-[12px] font-normal leading-[23px] tracking-[0.15px] text-black/60";

const inputClass =
    "!h-[23px] !w-full !p-0 text-[16px] font-normal !leading-[23px] tracking-[0.15px] !text-[#2E2E2E] shadow-none outline-none";

const CVTextField = ({ label, name }: CVTextFieldProps) => {
    return (
        <div className={`${fieldBaseClass} h-[53px]`}>
            <span className={labelClass}>{label}</span>

            <Form.Item name={name} noStyle>
                <Input variant="borderless" className={inputClass} />
            </Form.Item>
        </div>
    );
};

const CVDescriptionField = () => {
    return (
        <div className={`${fieldBaseClass} min-h-[190px]`}>
            <span className={labelClass}>Description</span>

            <Form.Item name="description" noStyle>
                <Input.TextArea
                    variant="borderless"
                    autoSize={false}
                    className="
            !min-h-[161px]
            !w-full
            !resize-none
            resize-none
            !p-0
            text-[14px]
            font-normal
            !leading-[22px]
            tracking-[0.15px]
            !text-[#2E2E2E]
            shadow-none
            outline-none
            [&::-webkit-resizer]:hidden
            md:text-[16px]
            md:!leading-[23px]
          "
                    style={{
                        resize: "none",
                        cursor: "text",
                    }}
                />
            </Form.Item>
        </div>
    );
};

const CVDetailsFormContent = ({
                                  cv,
                                  isUpdating,
                                  updateCVDetails,
                              }: CVDetailsFormContentProps) => {
    const [form] = Form.useForm<CVDetailsFormValues>();
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            name: cv.name ?? "",
            education: cv.education ?? "",
            description: cv.description ?? "",
        });
    }, [cv, form]);

    const handleSubmit = async (values: CVDetailsFormValues) => {
        try {
            await updateCVDetails({
                name: values.name,
                education: values.education,
                description: values.description,
            });

            setIsChanged(false);
        } catch (error) {
            console.error("Update CV error:", error);
        }
    };

    return (
        <div className="mx-auto w-full max-w-[852px]">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                onValuesChange={() => setIsChanged(true)}
                className="flex w-full flex-col gap-[31px]"
            >
                <CVTextField label="Name" name="name" />

                <CVTextField label="Education" name="education" />

                <CVDescriptionField />

                <div className="flex justify-end pt-[14px]">
                    <button
                        type="submit"
                        disabled={!isChanged || isUpdating}
                        className="
                            h-[48px]
                            w-full
                            rounded-[40px]
                            border-none
                            bg-[#C63031]
                            text-[14px]
                            font-medium
                            uppercase
                            leading-[24.5px]
                            tracking-[0.4px]
                            text-white
                            disabled:bg-black/12
                            disabled:text-black/25
                            sm:w-[410px]
                          "
                    >
                        UPDATE
                    </button>
                </div>
            </Form>
        </div>
    );
};

export const CVDetailsForm = ({ cvId }: CVDetailsFormProps) => {
    const { cv, isLoading, isUpdating, error, updateCVDetails } = useCVDetails({
        cvId,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <Spin />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                type="error"
                message="Failed to load CV"
                description={error.message}
                showIcon
            />
        );
    }

    if (!cv) {
        return <Alert type="warning" message="CV not found" showIcon />;
    }

    return (
        <CVDetailsFormContent
            key={cv.id}
            cv={cv}
            isUpdating={isUpdating}
            updateCVDetails={updateCVDetails}
        />
    );
};