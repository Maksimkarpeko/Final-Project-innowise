import { PATH, User } from "@/src/shared";
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
) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Education",
    dataIndex: "education",
    key: "education",
  },
  {
    title: "Employee",
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
            <Link href={PATH.USER.CV.DETAILS(userId, record.id)}>Details</Link>
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
              Delete CV
            </span>
          ),
          danger: true,
        },
      ];

      return (
        <>
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button type="text" shape="circle" icon={<EllipsisVertical />} />
          </Dropdown>
        </>
      );
    },
  },
];
