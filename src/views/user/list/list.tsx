"use client";
import { HeaderSearch, ModalEdit, UserTable } from "@/src/widgets";
import { useState } from "react";

export const UserListPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(isOpen);
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden p-4">
      <div className="w-[320px]">
        <HeaderSearch />
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <UserTable setIsOpen={setIsOpen} />
      </div>
      {isOpen && <ModalEdit isOpen={isOpen} setIsModalOpen={setIsOpen} />}
    </div>
  );
};
