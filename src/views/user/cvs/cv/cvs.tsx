"use client";
import { GET_USER_CVS } from "@/src/entities";
import { CVList } from "@/src/features/CV/ui/list/CVList";
import { UserResponse } from "@/src/shared";
import { ModalCV } from "@/src/widgets";
import { CvsHeader } from "@/src/widgets/CvsHeader/CvsHeader";
import { ModalCVDelete } from "@/src/widgets/ModalCVDelete";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ActiveCv } from "./type/type";

type UserProfilePageProps = {
  userId: string;
};

export const UserCVSPage = ({ userId }: UserProfilePageProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [activeCv, setActiveCv] = useState<ActiveCv>({
    id: "",
    name: "",
  });
  const { data: CV, loading } = useQuery<UserResponse>(GET_USER_CVS, {
    variables: {
      userId,
    },
  });
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div className="h-screen">
      <CvsHeader isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <CVList
        CV={CV}
        loading={loading}
        setIsOpenModalDelete={setIsOpenModalDelete}
        setActiveCv={setActiveCv}
      />
      {isOpenModal && (
        <ModalCV isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      )}
      {isOpenModalDelete && (
        <ModalCVDelete
          isOpenModalDelete={isOpenModalDelete}
          setIsOpenModalDelete={setIsOpenModalDelete}
          activeCv={activeCv}
        />
      )}
    </div>
  );
};
