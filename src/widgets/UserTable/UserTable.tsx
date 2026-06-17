"use client";
import { Table } from "antd";
import { getColumns } from "./getColums";
import { FC } from "react";
import { User } from "@/src/shared";

type UserTableProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  filterData: User[];
};

export const UserTable: FC<UserTableProps> = ({
  setIsOpen,
  userId,
  filterData,
}) => {
  const columns = getColumns(setIsOpen, userId);
  return (
    <Table
      columns={columns}
      dataSource={filterData}
      className="w-[98%] [&_.ant-table-thead_th]:bg-transparent!"
    />
  );
};
