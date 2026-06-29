"use client";
import { getUserId, UserResponse } from "@/src/shared";
import { Table } from "antd";
import { getColumns } from "./columCv";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { ActiveCv } from "@/src/views";

export type CvRowType = NonNullable<UserResponse["user"]["cvs"]>[number] & {
  email?: string;
};

type CVListProps = {
  cvs: NonNullable<UserResponse["user"]["cvs"]>;
  userEmail?: string;
  loading: boolean;
  setIsOpenModalDelete: Dispatch<SetStateAction<boolean>>;
  setActiveCv: Dispatch<SetStateAction<ActiveCv>>;
};

export const CVList: FC<CVListProps> = ({
  cvs,
  userEmail,
  loading,
  setIsOpenModalDelete,
  setActiveCv,
}) => {
  const userId = getUserId();
  const columns = getColumns(userId, setIsOpenModalDelete, setActiveCv);

  const tableData: CvRowType[] = useMemo(() => {
    return cvs.map((cv) => ({
      ...cv,
      email: userEmail,
    }));
  }, [cvs, userEmail]);

  const expandedKeys = useMemo(() => tableData.map((cv) => cv.id), [tableData]);

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      loading={loading}
      className="w-full md:w-[95%] pb-20 md:pb-0 [&_.ant-table-thead_th]:bg-transparent! ml-5 [&_.ant-table-expanded-row_td]:bg-transparent!"
      rowKey="id"
      expandable={{
        expandedRowKeys: expandedKeys,
        showExpandColumn: false,
        expandedRowRender: (record) => (
          <div className="text-gray-500 bg-none">
            {record.description || "No description provided"}
          </div>
        ),
      }}
    />
  );
};