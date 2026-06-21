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
import { ModalSchemaValues } from "./modalSchema";
import { getDepartments, getPositions } from "@/src/entities";

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
  const { control, handleSubmit, reset } = useForm<ModalSchemaValues>({
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
  const [updateUserFN, { error }] = useMutation(updateUser);
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

    try {
      await updateProfile({
        variables: {
          profile: {
            userId: String(userId),
            first_name: data.first_name,
            last_name: data.last_name,
          },
        },
        refetchQueries: [{ query: getUserById, variables: { id: userId } }],
      });
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
                  defaultValue=""
                  options={
                    departments?.departments.map((d) => ({
                      value: d.name,
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
                  defaultValue=""
                  options={
                    positions?.positions.map((p) => ({
                      value: p.name,
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
        </form>
      </Modal>
    </ConfigProvider>
  );
};
