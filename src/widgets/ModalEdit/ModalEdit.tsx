"use client";

import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "antd";
import { X } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getDepartments,
  getPositions,
  getUserById,
  updateProfileUser,
  updateUser,
} from "@/src/entities";
import {
  DepartmentsResponse,
  FloatingInput,
  FloatingSelect,
  PositionsResponse,
  UserResponse,
  useLocale,
} from "@/src/shared";

import { modalSchema, ModalSchemaValues } from "./modalSchema";

type ModalProps = {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string | null;
};

export const ModalEdit: FC<ModalProps> = ({
                                            isOpen,
                                            setIsModalOpen,
                                            userId,
                                          }) => {
  const { t } = useLocale();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ModalSchemaValues>({
    resolver: zodResolver(modalSchema),
    mode: "onChange",
  });

  const { data: departments } = useQuery<DepartmentsResponse>(getDepartments);
  const { data: positions } = useQuery<PositionsResponse>(getPositions);

  const { data, loading: userLoading } = useQuery<UserResponse>(getUserById, {
    variables: {
      id: userId,
    },
    skip: !userId,
  });

  const [updateProfile, { error }] = useMutation(updateProfileUser);
  const [updateUserFN, { error: errorUpdateUser }] = useMutation(updateUser);

  useEffect(() => {
    if (!data?.user) {
      return;
    }

    reset({
      first_name: data.user.profile.first_name || "",
      last_name: data.user.profile.last_name || "",
      department: data.user.department?.id || "",
      position: data.user.position?.id || "",
      role: data.user.role || "",
    });
  }, [data, reset]);

  const handleOk = async (values: ModalSchemaValues) => {
    if (!userId) {
      console.error("Id not found");
      return;
    }

    const profileFunc = updateProfile({
      variables: {
        profile: {
          userId: String(userId),
          first_name: values.first_name,
          last_name: values.last_name,
        },
      },
      refetchQueries: [{ query: getUserById, variables: { id: userId } }],
    });

    const userFunc = updateUserFN({
      variables: {
        user: {
          userId: String(userId),
          departmentId: values.department,
          positionId: values.position,
        },
      },
    });

    try {
      await Promise.all([profileFunc, userFunc]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
      <Modal
          title={null}
          footer={null}
          open={isOpen}
          onCancel={handleCancel}
          loading={userLoading}
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
              {t.employees.modalEdit.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-6 pt-4">
            <FloatingInput
                label={t.employees.modalEdit.email}
                type="email"
                disabled
                defaultValue={data?.user?.email || ""}
            />

            <FloatingInput
                label={t.employees.modalEdit.password}
                isPassword
                disabled
                defaultValue="secretPassword"
            />

            <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                    <FloatingInput
                        label={t.employees.modalEdit.firstName}
                        type="text"
                        {...field}
                    />
                )}
            />

            <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                    <FloatingInput
                        label={t.employees.modalEdit.lastName}
                        type="text"
                        {...field}
                    />
                )}
            />

            <Controller
                name="department"
                control={control}
                render={({ field }) => (
                    <FloatingSelect
                        label={t.employees.modalEdit.department}
                        value={field.value}
                        onChange={field.onChange}
                        options={
                            departments?.departments.map((department) => ({
                              value: department.id,
                              label: department.name,
                            })) ?? []
                        }
                    />
                )}
            />

            <Controller
                name="position"
                control={control}
                render={({ field }) => (
                    <FloatingSelect
                        label={t.employees.modalEdit.position}
                        value={field.value}
                        onChange={field.onChange}
                        options={
                            positions?.positions.map((position) => ({
                              value: position.id,
                              label: position.name,
                            })) ?? []
                        }
                    />
                )}
            />

            <Controller
                name="role"
                control={control}
                render={({ field }) => (
                    <FloatingSelect
                        label={t.employees.modalEdit.role}
                        value={field.value || data?.user.role || ""}
                        locked
                        options={[
                          {
                            value: data?.user.role || "",
                            label: data?.user.role || t.employees.modalEdit.employee,
                          },
                        ]}
                    />
                )}
            />

            {error && (
                <span className="col-span-2 text-[13px] text-[#D9363E]">
              {error.message}
            </span>
            )}

            {errorUpdateUser && (
                <span className="col-span-2 text-[13px] text-[#D9363E]">
              {errorUpdateUser.message}
            </span>
            )}
          </div>

          <div className="mt-[32px] flex items-center justify-end gap-[16px]">
            <button
                type="button"
                onClick={handleCancel}
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
                disabled={!isValid}
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
              {t.common.submit}
            </button>
          </div>
        </form>
      </Modal>
  );
};