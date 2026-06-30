"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { Modal } from "antd";
import { X } from "lucide-react";
import { useMutation } from "@apollo/client/react";

import { GET_USER_CVS } from "@/src/entities";
import { DELETE_CV } from "@/src/entities/cv/api/cv.api";
import { getUserId, useLocale } from "@/src/shared";
import { ActiveCv } from "@/src/views";

type ModalCVDeleteProps = {
  isOpenModalDelete: boolean;
  setIsOpenModalDelete: Dispatch<SetStateAction<boolean>>;
  activeCv: ActiveCv;
};

export const ModalCVDelete: FC<ModalCVDeleteProps> = ({
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
          title={null}
          footer={null}
          open={isOpenModalDelete}
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
        <div>
          <div className="mb-[32px] flex items-center justify-between">
            <h2 className="font-roboto text-[24px] font-medium leading-[32px] text-[#2E2E2E] transition-colors dark:text-white/90">
              {t.cv.modal.deleteTitle}
            </h2>
          </div>

          <p className="font-roboto text-[18px] font-normal leading-[28px] text-[#2E2E2E] transition-colors dark:text-white/85">
            {t.cv.delete.confirmPrefix}{" "}
            <span className="font-semibold text-[#2E2E2E] dark:text-white">
            {activeCv.name}
          </span>
            ?
          </p>

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
                type="button"
                onClick={handleOk}
                disabled={loading}
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
              disabled:opacity-50
            "
            >
              {loading ? t.common.loading : t.common.confirm}
            </button>
          </div>
        </div>
      </Modal>
  );
};