"use client";
import { GET_USER_CVS } from "@/src/entities";
import { DELETE_CV } from "@/src/entities/cv/api/cv.api";
import { APP_TEXT, getUserId } from "@/src/shared";
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
      title={"Delete CV"}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpenModalDelete}
      okButtonProps={{ loading }}
      onCancel={handleCancel}
      okText={"Submit"}
      onOk={handleOk}
      cancelText="Cancel"
      width={650}
    >
      <p>
        {APP_TEXT.cv.deleteText} {activeCv.name}
      </p>
      {error && <span className="text-red-500">{error.message}</span>}
    </Modal>
  );
};
