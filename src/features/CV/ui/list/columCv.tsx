import { PATH, Translations } from "@/src/shared";
import { Button, Dropdown } from "antd";
import { EllipsisVertical } from "lucide-react";
import { CvRowType } from "./CVList";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { ActiveCv } from "@/src/views";

export const getColumns = (
  userId: string,
  setIsOpenModal: Dispatch<SetStateAction<boolean>>,
  setActiveCv: Dispatch<SetStateAction<ActiveCv>>,
  t: Translations,
) => [
  {
    title: t.cv.table.name,
    dataIndex: "name",
    key: "name",
  },
  {
    title: t.cv.table.education,
    dataIndex: "education",
    key: "education",
  },
  {
    title: t.cv.table.employee,
    dataIndex: "email",
    key: "email",
  },
  {
    title: "",
    key: "actions",
    width: 80,
    render: (_: unknown, record: CvRowType) => {
      const menuItems = [
        {
          key: "details",
          label: (
            <Link href={PATH.USER.CV.DETAILS(userId, record.id)}>
              {t.cv.actions.details}
            </Link>
          ),
        },
        {
          key: "delete",
          label: (
            <span
              onClick={() => {
                setActiveCv({
                  id: record.id,
                  name: record.name,
                });
                setIsOpenModal(true);
              }}
            >
              {t.cv.actions.delete}
            </span>
          ),
          danger: true,
        },
      ];

      return (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button type="text" shape="circle" icon={<EllipsisVertical />} />
        </Dropdown>
      );
    },
  },
];
