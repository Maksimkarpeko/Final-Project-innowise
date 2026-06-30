"use client";
import { Table } from "antd";
import { getColumns } from "./getColumns";
import { FC } from "react";
import { User, useLocale } from "@/src/shared";

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
  const { t } = useLocale();
  const columns = getColumns(setIsOpen, userId, t);

  return (
    <Table
      columns={columns}
      dataSource={filterData}
      rowKey="id"
      scroll={{ x: "max-content" }}
      className="w-full md:w-[98%] pb-20 md:pb-0 [&_.ant-table-thead_th]:bg-transparent!"
      pagination={{
        pageSize: 10, 
        showSizeChanger: false,
        responsive: true,
        size: "small",
      }}
    />
  );
};
