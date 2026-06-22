"use client";
import { getUserById, updateProfileUser, updateUser } from "@/src/entities";
import {
  DepartmentsResponse,
  FloatingInput,
  FloatingSelect,
  PositionsResponse,
  UserResponse,
} from "@/src/shared";
import { useMutation, useQuery } from "@apollo/client/react";
import { ConfigProvider } from "antd";
import Modal from "antd/es/modal/Modal";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { modalSchema, ModalSchemaValues } from "./modalSchema";
import { getDepartments, getPositions } from "@/src/entities";
import { zodResolver } from "@hookform/resolvers/zod";

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
    if (data?.user) {
      reset({
        first_name: data?.user?.profile.first_name || "",
        last_name: data.user.profile.last_name || "",
      });
    }
  }, [data, reset]);

  const handleOk = async (data: ModalSchemaValues) => {
    if (!userId) {
      console.error("Id not found");
    }
    const profileFunc = updateProfile({
      variables: {
        profile: {
          userId: String(userId),
          first_name: data.first_name,
          last_name: data.last_name,
        },
      },
      refetchQueries: [{ query: getUserById, variables: { id: userId } }],
    });
    const userFunc = updateUserFN({
      variables: {
        user: {
          userId: String(userId),
          departmentId: data.department,
          positionId: data.position,
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
    <ConfigProvider>
      <Modal
        title="Update user"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        onOk={handleSubmit(handleOk)}
        okButtonProps={{ disabled: !isValid }}
        onCancel={handleCancel}
        loading={userLoading}
        okText={"Submit"}
        cancelText="Cancel"
        width={650}
      >
        <form
          action=""
          className="grid grid-cols-2 gap-x-10 gap-y-6 pt-4"
          onSubmit={handleSubmit(handleOk)}
        >
          <FloatingInput
            label="Email"
            type="email"
            disabled
            defaultValue={`${data?.user.email}`}
          />
          <FloatingInput
            label="Password"
            isPassword
            disabled
            defaultValue={`secretPassword`}
          />

          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <FloatingInput label="First Name" type="text" {...field} />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <FloatingInput label="Last Name" type="text" {...field} />
            )}
          />

          <div>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <FloatingSelect
                  label="Department"
                  defaultValue={`${data?.user.department.name}`}
                  options={
                    departments?.departments.map((d) => ({
                      value: d.id,
                      label: d.name,
                    })) ?? []
                  }
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <FloatingSelect
                  label="Position"
                  defaultValue={`${data?.user.position.name}`}
                  options={
                    positions?.positions.map((p) => ({
                      value: p.id,
                      label: p.name,
                    })) ?? []
                  }
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FloatingSelect
                  label="Role"
                  defaultValue="Employee"
                  options={[
                    {
                      value: `${data?.user.role}`,
                      label: `${data?.user.role}`,
                    },
                  ]}
                  disabled
                  {...field}
                />
              )}
            />
          </div>
          {error && <span className="text-red-500">{error.message}</span>}
          {errorUpdateUser && (
            <span className="text-red-500">{errorUpdateUser.message}</span>
          )}
        </form>
      </Modal>
    </ConfigProvider>
  );
};
