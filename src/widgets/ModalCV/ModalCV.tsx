"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import { Modal } from "antd";
import { X } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";

import { CREATE_CV } from "@/src/entities/cv";
import { GET_USER_CVS } from "@/src/entities";
import { getUserId, useLocale } from "@/src/shared";

import { schemaCV, SchemaCVValue } from "./schemaCV";

type ModalCVProps = {
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    isOpenModal: boolean;
};

type ModalFieldProps = {
    label: string;
    error?: string;
    children: React.ReactNode;
    textarea?: boolean;
};

const ModalField = ({ label, error, children, textarea }: ModalFieldProps) => {
    return (
        <div>
            <div
                className={`
          group
          relative
          w-full
          border
          bg-transparent
          px-3
          transition-colors

          ${
                    textarea
                        ? "min-h-[158px] pb-3 pt-[18px]"
                        : "h-[48px] pb-2 pt-[16px]"
                }

          ${
                    error
                        ? "border-[#D9363E]"
                        : "border-[#5A5A5A] focus-within:border-[#D9363E]"
                }

          dark:bg-transparent
        `}
            >
                <label
                    className={`
            absolute
            -top-[10px]
            left-3
            z-10
            bg-white
            px-1
            font-roboto
            text-[12px]
            font-normal
            leading-[20px]
            tracking-[0.15px]
            transition-colors

            dark:bg-[#303030]

            ${
                        error
                            ? "text-[#D9363E]"
                            : "text-[#767676] group-focus-within:text-[#D9363E] dark:text-white/45"
                    }
          `}
                >
                    {label}
                </label>

                {children}
            </div>

            {error && (
                <span className="mt-1 block text-[12px] text-[#D9363E]">
          {error}
        </span>
            )}
        </div>
    );
};

export const ModalCV: FC<ModalCVProps> = ({
                                              setIsOpenModal,
                                              isOpenModal,
                                          }) => {
    const userId = getUserId();
    const { t } = useLocale();

    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid, errors },
    } = useForm<SchemaCVValue>({
        resolver: zodResolver(schemaCV),
        mode: "onChange",
        defaultValues: {
            name: "",
            education: "",
            description: "",
        },
    });

    const [createCV, { loading, error }] = useMutation(CREATE_CV);

    const handleOk = async (data: SchemaCVValue) => {
        try {
            await createCV({
                variables: {
                    cv: {
                        name: data.name,
                        education: data.education,
                        description: data.description,
                        userId,
                    },
                },
                refetchQueries: [{ query: GET_USER_CVS, variables: { userId } }],
            });

            reset();
            setIsOpenModal(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancel = () => {
        reset();
        setIsOpenModal(false);
    };

    return (
        <Modal
            title={null}
            footer={null}
            open={isOpenModal}
            onCancel={handleCancel}
            width={650}
            centered
            closeIcon={
                <X
                    size={28}
                    strokeWidth={1.8}
                    className="text-[#767676] transition-colors dark:text-white/90"
                />
            }
            className="
        [&_.ant-modal-content]:!rounded-[2px]
        [&_.ant-modal-content]:!bg-white
        [&_.ant-modal-content]:!px-[28px]
        [&_.ant-modal-content]:!pb-[24px]
        [&_.ant-modal-content]:!pt-[20px]
        [&_.ant-modal-content]:!shadow-[0_12px_40px_rgba(0,0,0,0.18)]

        dark:[&_.ant-modal-content]:!bg-[#303030]
        dark:[&_.ant-modal-content]:!shadow-[0_12px_40px_rgba(0,0,0,0.45)]

        [&_.ant-modal-close]:!text-[#767676]
        [&_.ant-modal-close]:!transition-colors
        [&_.ant-modal-close:hover]:!bg-transparent
        [&_.ant-modal-close:hover]:!text-[#2E2E2E]

        dark:[&_.ant-modal-close]:!text-white/75
        dark:[&_.ant-modal-close:hover]:!bg-transparent
        dark:[&_.ant-modal-close:hover]:!text-white
      "
        >
            <form onSubmit={handleSubmit(handleOk)}>
                <div className="mb-[28px] flex items-center justify-between">
                    <h2 className="font-roboto text-[24px] font-medium leading-[32px] text-[#2E2E2E] transition-colors dark:text-white/90">
                        {t.cv.modal.createTitle}
                    </h2>
                </div>

                <div className="flex flex-col gap-[28px]">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <ModalField label={t.cv.form.name} error={errors.name?.message}>
                                <input
                                    {...field}
                                    type="text"
                                    autoComplete="off"
                                    className="
                    h-full
                    w-full
                    border-none
                    bg-transparent
                    p-0
                    font-roboto
                    text-[16px]
                    font-normal
                    leading-[24px]
                    tracking-[0.15px]
                    text-[#2E2E2E]
                    outline-none
                    transition-colors

                    placeholder:text-[#767676]

                    dark:text-white/90
                    dark:placeholder:text-white/45
                  "
                                />
                            </ModalField>
                        )}
                    />

                    <Controller
                        name="education"
                        control={control}
                        render={({ field }) => (
                            <ModalField
                                label={t.cv.form.education}
                                error={errors.education?.message}
                            >
                                <input
                                    {...field}
                                    type="text"
                                    autoComplete="off"
                                    className="
                    h-full
                    w-full
                    border-none
                    bg-transparent
                    p-0
                    font-roboto
                    text-[16px]
                    font-normal
                    leading-[24px]
                    tracking-[0.15px]
                    text-[#2E2E2E]
                    outline-none
                    transition-colors

                    placeholder:text-[#767676]

                    dark:text-white/90
                    dark:placeholder:text-white/45
                  "
                                />
                            </ModalField>
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <ModalField
                                label={t.cv.form.description}
                                error={errors.description?.message}
                                textarea
                            >
                <textarea
                    {...field}
                    className="
                    h-[118px]
                    w-full
                    resize-none
                    border-none
                    bg-transparent
                    p-0
                    font-roboto
                    text-[16px]
                    font-normal
                    leading-[24px]
                    tracking-[0.15px]
                    text-[#2E2E2E]
                    outline-none
                    transition-colors

                    placeholder:text-[#767676]

                    dark:text-white/90
                    dark:placeholder:text-white/45
                  "
                />
                            </ModalField>
                        )}
                    />
                </div>

                {error && (
                    <span className="mt-4 block text-[13px] text-[#D9363E]">
            {error.message}
          </span>
                )}

                <div className="mt-[32px] flex items-center justify-end gap-[16px]">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="
              h-[48px]
              w-[220px]
              rounded-[40px]
              border
              border-[#D9D9D9]
              bg-transparent
              font-roboto
              text-[14px]
              font-medium
              uppercase
              leading-[24.5px]
              tracking-[0.4px]
              text-[#767676]
              transition-colors

              hover:border-[#BDBDBD]
              hover:bg-black/5
              hover:text-[#2E2E2E]

              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:border-white/20
              dark:text-white/55

              dark:hover:border-white/25
              dark:hover:bg-white/[0.08]
              dark:hover:text-white/75
            "
                    >
                        {t.common.cancel}
                    </button>

                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className="
              h-[48px]
              w-[220px]
              rounded-[40px]
              border-none
              bg-[#D9363E]
              font-roboto
              text-[14px]
              font-medium
              uppercase
              leading-[24.5px]
              tracking-[0.4px]
              text-white
              shadow-[0_2px_4px_rgba(0,0,0,0.25)]
              transition-colors

              hover:bg-[#C63031]

              disabled:cursor-not-allowed
              disabled:bg-black/12
              disabled:text-black/25
              disabled:shadow-none
              disabled:hover:bg-black/12

              dark:bg-[#D9363E]
              dark:text-white
              dark:hover:bg-[#C63031]

              dark:disabled:bg-white/14
              dark:disabled:text-white/45
              dark:disabled:hover:bg-white/14
            "
                    >
                        {loading ? t.common.loading : t.common.submit}
                    </button>
                </div>
            </form>
        </Modal>
    );
};