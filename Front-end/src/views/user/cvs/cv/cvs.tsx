"use client";

import { GET_USER_CVS } from "@/src/entities";
import { CVList } from "@/src/features/CV/ui/list/CVList";
import { UserResponse } from "@/src/shared";
import { ModalCV } from "@/src/widgets";
import { CvsHeader } from "@/src/widgets/CvsHeader/CvsHeader";
import { ModalCVDelete } from "@/src/widgets/ModalCVDelete";
import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";

import { ActiveCv } from "./type/type";

type UserProfilePageProps = {
  userId: string;
};

export const UserCVSPage = ({ userId }: UserProfilePageProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeCv, setActiveCv] = useState<ActiveCv>({ id: "", name: "" });

  const { data: CV, loading } = useQuery<UserResponse>(GET_USER_CVS, {
    variables: { userId },
  });

  const filteredCvs = useMemo(() => {
    if (!CV?.user?.cvs) return [];
    if (!searchValue.trim()) return CV.user.cvs;

    const lowerSearchValue = searchValue.toLowerCase();

    return CV.user.cvs.filter((cv) =>
        cv?.name?.toLowerCase().includes(lowerSearchValue),
    );
  }, [CV, searchValue]);

  return (
      <div className="min-h-screen w-full bg-white text-[#2E2E2E] transition-colors dark:bg-[#303030] dark:text-white/90">
        <CvsHeader
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
        />

        <CVList
            cvs={filteredCvs}
            userEmail={CV?.user?.email}
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