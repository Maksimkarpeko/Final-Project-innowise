"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { schemaCV, SchemaCVValue } from "./schemaCV";
import { FloatingInput, FloatingTextArea, getUserId, useLocale } from "@/src/shared";
import { useMutation } from "@apollo/client/react";
import { CREATE_CV } from "@/src/entities/cv";
import { GET_USER_CVS } from "@/src/entities";

type ModalCVProps = {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  isOpenModal: boolean;
};

export const ModalCV: FC<ModalCVProps> = ({ setIsOpenModal, isOpenModal }) => {
  const userId = getUserId();
  const { t } = useLocale();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<SchemaCVValue>({
    resolver: zodResolver(schemaCV),
    mode: "onChange",
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
      setIsOpenModal(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <Modal
      title={t.cv.modal.createTitle}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpenModal}
      onCancel={handleCancel}
      okText={t.common.submit}
      onOk={handleSubmit(handleOk)}
      okButtonProps={{
        disabled: !isValid,
        loading,
        style: isValid
          ? {
              backgroundColor: "#d32f2f",
              borderColor: "#d32f2f",
              color: "#ffffff",
              opacity: 1,
              padding: "0 30px",
            }
          : {
              padding: "0 30px",
            },
      }}
      cancelText={t.common.cancel}
      width={650}
    >
      <form action="" onSubmit={handleSubmit(handleOk)}>
        <div className="mt-6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FloatingInput
                label={t.cv.form.name}
                type="text"
                defaultValue=""
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-6">
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <FloatingInput
                label={t.cv.form.education}
                type="text"
                defaultValue=""
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-6">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FloatingTextArea
                label={t.cv.form.description}
                type="text"
                defaultValue=""
                {...field}
              />
            )}
          />
        </div>
        {error && <span className="text-red-500">{error.message}</span>}
      </form>
    </Modal>
  );
};
