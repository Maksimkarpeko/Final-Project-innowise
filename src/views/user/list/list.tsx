"use client";

import { getUsers } from "@/src/entities";
import { getUserId, HeaderSearch, UsersResponse } from "@/src/shared";
import { ModalEdit, UserTable } from "@/src/widgets";
import { useQuery } from "@apollo/client/react";
import { useState, useEffect } from "react";

export const UserListPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userId = getUserId();

  const { data, refetch } = useQuery<UsersResponse>(getUsers, {
    pollInterval: 0,
  });

  useEffect(() => {
    refetch();
  }, [refetch, isOpen]);

  const dataWithId = data?.users.filter((user) => user.id === userId) || [];
  const dataWithoutId = data?.users.filter((user) => user.id !== userId) || [];

  const newData = [...dataWithId, ...dataWithoutId];

  const filterData = newData.filter((user) => {
    const lowerSearchValue = searchValue.toLowerCase();
    if (!searchValue) {
      return true;
    }

    const firstName = user?.profile?.first_name?.toLowerCase() || "";
    const secondName = user?.profile?.last_name?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";
    return (
      firstName.includes(lowerSearchValue) ||
      secondName.includes(lowerSearchValue) ||
      email.includes(lowerSearchValue)
    );
  });

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden p-4">
      <div className="w-[320px]">
        <HeaderSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <UserTable
          setIsOpen={setIsOpen}
          filterData={filterData}
          userId={userId}
        />
      </div>
      {isOpen && (
        <ModalEdit isOpen={isOpen} setIsModalOpen={setIsOpen} userId={userId} />
      )}
    </div>
  );
};
