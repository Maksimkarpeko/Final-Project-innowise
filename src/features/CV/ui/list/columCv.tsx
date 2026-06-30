import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Button, Dropdown } from "antd";
import { EllipsisVertical } from "lucide-react";

import { ActiveCv } from "@/src/views";
import { PATH, Translations } from "@/src/shared";

import { CvRowType } from "./CVList";

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
    sorter: true,
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
          <Dropdown
              menu={{
                items: menuItems,
                className: `
              [&_.ant-dropdown-menu]:!bg-white
              dark:[&_.ant-dropdown-menu]:!bg-[#303030]

              [&_.ant-dropdown-menu-item]:!text-[#2E2E2E]
              dark:[&_.ant-dropdown-menu-item]:!text-white/80

              dark:[&_.ant-dropdown-menu-item:hover]:!bg-white/10
              dark:[&_.ant-dropdown-menu-item-danger]:!text-[#ff4d4f]
            `,
              }}
              trigger={["click"]}
          >
            <Button
                type="text"
                shape="circle"
                icon={<EllipsisVertical />}
                className="
              text-[#767676]!
              transition-colors
              hover:bg-black/5!
              hover:text-[#2E2E2E]!

              dark:text-white/75!
              dark:hover:bg-white/10!
              dark:hover:text-white!
            "
            />
          </Dropdown>
      );
    },
  },
];