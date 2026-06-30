"use client";

import { useEffect, useState } from "react";
import { Alert, Form, Spin } from "antd";

import { useCVDetails } from "../../hooks/useCVDetails";
import type { CVDetails, CVDetailsFormValues } from "../../model/types";
import { useLocale } from "@/src/shared";

import { CvFormField } from "./CvFormFiled";

type CVDetailsFormProps = {
    cvId: string;
};

type CVDetailsFormContentProps = {
    cv: CVDetails;
    isUpdating: boolean;
    updateCVDetails: (values: CVDetailsFormValues) => Promise<unknown>;
};

const getInitialValues = (cv: CVDetails): CVDetailsFormValues => ({
    name: cv.name ?? "",
    education: cv.education ?? "",
    description: cv.description ?? "",
});

const CVDetailsFormContent = ({
                                  cv,
                                  isUpdating,
                                  updateCVDetails,
                              }: CVDetailsFormContentProps) => {
    const { t } = useLocale();
    const [form] = Form.useForm<CVDetailsFormValues>();
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        form.setFieldsValue(getInitialValues(cv));
    }, [cv, form]);

    const handleSubmit = async (values: CVDetailsFormValues) => {
        try {
            await updateCVDetails(values);
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
                <CvFormField label={t.cv.form.name} name="name" />

                <CvFormField label={t.cv.form.education} name="education" />

                <CvFormField
                    label={t.cv.form.description}
                    name="description"
                    variant="textarea"
                />

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
                        {t.common.update}
                    </button>
                </div>
            </Form>
        </div>
    );
};

export const CVDetailsForm = ({ cvId }: CVDetailsFormProps) => {
    const { t } = useLocale();
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
                message={t.cv.errors.loadFailed}
                description={error.message}
                showIcon
            />
        );
    }

    if (!cv) {
        return <Alert type="warning" message={t.cv.errors.notFound} showIcon />;
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