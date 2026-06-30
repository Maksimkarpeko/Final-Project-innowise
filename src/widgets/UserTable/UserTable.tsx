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
            className="
        w-full
        pb-20
        md:w-[98%]
        md:pb-0

        [&_.ant-table]:!bg-transparent
        [&_.ant-table-container]:!bg-transparent
        [&_.ant-table-content]:!bg-transparent

        [&_.ant-table-thead_th]:!bg-transparent
        [&_.ant-table-thead_th]:!text-[#2E2E2E]
        dark:[&_.ant-table-thead_th]:!text-white/80

        [&_.ant-table-tbody_td]:!bg-transparent
        [&_.ant-table-tbody_td]:!text-[#2E2E2E]
        dark:[&_.ant-table-tbody_td]:!text-white/80

        [&_.ant-table-tbody_td]:!border-[#E0E0E0]
        dark:[&_.ant-table-tbody_td]:!border-white/10

        [&_.ant-table-row:hover_td]:!bg-black/5
        dark:[&_.ant-table-row:hover_td]:!bg-white/8

        [&_.ant-table-tbody_td_a]:!text-[#767676]
        dark:[&_.ant-table-tbody_td_a]:!text-white/55

        [&_.ant-table-tbody_td_button]:!text-[#767676]
        dark:[&_.ant-table-tbody_td_button]:!text-white/55

        [&_.ant-table-tbody_td_svg]:!text-[#767676]
        [&_.ant-table-tbody_td_svg]:!stroke-[#767676]
        dark:[&_.ant-table-tbody_td_svg]:!text-white/55
        dark:[&_.ant-table-tbody_td_svg]:!stroke-white/55

        [&_.ant-table-tbody_td_button:hover]:!bg-transparent
        [&_.ant-table-tbody_td_button:hover]:!text-[#767676]
        dark:[&_.ant-table-tbody_td_button:hover]:!bg-transparent
        dark:[&_.ant-table-tbody_td_button:hover]:!text-white/55

        [&_.ant-table-tbody_td_a:hover]:!text-[#767676]
        dark:[&_.ant-table-tbody_td_a:hover]:!text-white/55

        [&_.ant-pagination-item-active]:!border-[#D9363E]
        [&_.ant-pagination-item-active_a]:!text-[#D9363E]
      "
            pagination={{
                pageSize: 10,
                showSizeChanger: false,
                responsive: true,
                size: "small",
            }}
        />
    );
};