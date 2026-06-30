"use client";

import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { Table } from "antd";

import { ActiveCv } from "@/src/views";
import { getUserId, UserResponse, useLocale } from "@/src/shared";

import { getColumns } from "./columCv";

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
  const { t } = useLocale();

  const columns = getColumns(userId, setIsOpenModalDelete, setActiveCv, t);

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
          rowKey="id"
          pagination={false}
          className="
        ml-5
        w-full
        pb-20
        transition-colors
        md:w-[95%]
        md:pb-0

        [&_.ant-spin-container]:!bg-transparent
        [&_.ant-table]:!bg-transparent
        [&_.ant-table-container]:!bg-transparent
        [&_.ant-table-content]:!bg-transparent

        [&_.ant-table-thead_th]:!border-[#E0E0E0]
        [&_.ant-table-thead_th]:!bg-transparent
        [&_.ant-table-thead_th]:!text-[#2E2E2E]
        dark:[&_.ant-table-thead_th]:!border-white/10
        dark:[&_.ant-table-thead_th]:!text-white/90

        [&_.ant-table-tbody_td]:!border-[#E0E0E0]
        [&_.ant-table-tbody_td]:!bg-transparent
        [&_.ant-table-tbody_td]:!text-[#2E2E2E]
        dark:[&_.ant-table-tbody_td]:!border-white/10
        dark:[&_.ant-table-tbody_td]:!text-white/85

        [&_.ant-table-row:hover_td]:!bg-black/5
        dark:[&_.ant-table-row:hover_td]:!bg-white/[0.06]

        [&_.ant-table-expanded-row_td]:!bg-transparent
        [&_.ant-table-expanded-row_td]:!border-[#E0E0E0]
        dark:[&_.ant-table-expanded-row_td]:!border-white/10

        [&_.ant-empty-description]:!text-[#767676]
        dark:[&_.ant-empty-description]:!text-white/55
      "
          expandable={{
            expandedRowKeys: expandedKeys,
            showExpandColumn: false,
            expandedRowRender: (record) => (
                <div className="max-w-[1180px] bg-transparent text-[16px] leading-[26px] text-[#767676] transition-colors dark:text-white/45">
                  {record.description || t.cv.table.noDescription}
                </div>
            ),
          }}
      />
  );
};