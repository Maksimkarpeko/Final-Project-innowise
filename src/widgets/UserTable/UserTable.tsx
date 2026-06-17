"use client";

import { Table } from "antd";
import { getColumns } from "./getColums";
import { useQuery } from "@apollo/client/react";
import { getUsers } from "@/src/entities";
import { getUserId, UsersResponse } from "@/src/shared";
import { FC } from "react";

type UserTableProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserTable: FC<UserTableProps> = ({ setIsOpen }) => {
  const userId = getUserId();
  const { data } = useQuery<UsersResponse>(getUsers);

  const dataWithId = data?.users.filter((user) => user.id === userId) || [];
  const dataWithoutId = data?.users.filter((user) => user.id !== userId) || [];

  const newData = [...dataWithId, ...dataWithoutId];
  const columns = getColumns(setIsOpen, userId);
  return (
    <Table
      columns={columns}
      dataSource={newData}
      className="w-[98%] [&_.ant-table-thead_th]:bg-transparent!"
    />
  );
};
