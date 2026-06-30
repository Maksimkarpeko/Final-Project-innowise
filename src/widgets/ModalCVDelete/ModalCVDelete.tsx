"use client";
import { GET_USER_CVS } from "@/src/entities";
import { DELETE_CV } from "@/src/entities/cv/api/cv.api";
import { getUserId, useLocale } from "@/src/shared";
import { ActiveCv } from "@/src/views";
import { useMutation } from "@apollo/client/react";
import { Modal } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

type ModalCVDelete = {
  isOpenModalDelete: boolean;
  setIsOpenModalDelete: Dispatch<SetStateAction<boolean>>;
  activeCv: ActiveCv;
};

export const ModalCVDelete: FC<ModalCVDelete> = ({
  isOpenModalDelete,
  setIsOpenModalDelete,
  activeCv,
}) => {
  const userId = getUserId();
  const { t } = useLocale();
  const [deleteCv, { error, loading }] = useMutation(DELETE_CV);

  const handleOk = async () => {
    try {
      await deleteCv({
        variables: {
          cv: {
            cvId: activeCv.id,
          },
        },
        refetchQueries: [{ query: GET_USER_CVS, variables: { userId } }],
      });
      setIsOpenModalDelete(false);
    } catch (e) {
      console.error(e);
    }
  };
  const handleCancel = () => {
    setIsOpenModalDelete(false);
  };
  return (
    <Modal
      title={t.cv.modal.deleteTitle}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpenModalDelete}
      onCancel={handleCancel}
      okText={t.common.submit}
      onOk={handleOk}
      cancelText={t.common.cancel}
      width={650}
      okButtonProps={{
        loading,
        style: {
          backgroundColor: "#d32f2f",
          borderColor: "#d32f2f",
          color: "#ffffff",
          opacity: 1,
          padding: "0 30px",
        },
      }}
    >
      <p>
        {t.cv.delete.confirmPrefix} {activeCv.name}
      </p>
      {error && <span className="text-red-500">{error.message}</span>}
    </Modal>
  );
};
