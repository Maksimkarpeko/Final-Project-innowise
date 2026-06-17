"use client";
import { getUserById, updateProfileUser } from "@/src/entities";
import {
  FloatingInput,
  FloatingSelect,
  getUserId,
  UserResponse,
} from "@/src/shared";
import { useMutation, useQuery } from "@apollo/client/react";
import { ConfigProvider, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ModalSchemaValues } from "./modalSchema";

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
  const { data, loading: userLoading } = useQuery<UserResponse>(getUserById, {
    variables: {
      id: userId,
    },
    skip: !userId,
  });
  const [update, { error, loading }] = useMutation(updateProfileUser);

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
    console.log(userId);

    try {
      await update({
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
            <FloatingSelect
              label="Department"
              defaultValue=""
              onChange={handleChange}
              options={[]}
            />
          </div>
          <div>
            <FloatingSelect
              label="Position"
              defaultValue=""
              onChange={handleChange}
              options={[]}
            />
          </div>

          <div>
            <FloatingSelect
              label="Position"
              defaultValue="Employee"
              onChange={handleChange}
              options={[
                { value: `${data?.user.role}`, label: `${data?.user.role}` },
              ]}
              disabled
            />
          </div>
          {error && <span className="text-red-500">{error.message}</span>}
        </form>
      </Modal>
    </ConfigProvider>
  );
};
