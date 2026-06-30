"use client";
import { PATH, Translations, User } from "@/src/shared";
import { Avatar, Button, Dropdown } from "antd";
import { ChevronRight, EllipsisVertical, User as UserIcon } from "lucide-react";
import Link from "next/link";

export const getColumns = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
  t: Translations,
) => [
  {
    dataIndex: ["profile", "avatar"],
    key: "avatar",
    render: (_: unknown, record: User) => {
      const avatarUrl = record.profile?.avatar;

      return (
        <Avatar
          src={avatarUrl}
          icon={!avatarUrl && <UserIcon />}
          size="large"
        />
      );
    },
  },
  {
    title: t.employees.table.firstName,
    dataIndex: ["profile", "first_name"],
    key: "first_name",
  },
  {
    title: t.employees.table.lastName,
    dataIndex: ["profile", "last_name"],
    key: "last_name",
  },
  {
    title: t.employees.table.email,
    dataIndex: "email",
    key: "email",
  },
  {
    title: t.employees.table.department,
    dataIndex: "department_name",
    key: "department_name",
  },
  {
    title: t.employees.table.position,
    dataIndex: "position_name",
    key: "position_name",
  },
  {
    title: "",
    key: "actions",
    width: 80,
    render: (_: unknown, record: User) => {
      const menuItems = [
        {
          key: "edit",
          label: t.employees.actions.update,
          onClick: () => {
            setIsOpen(true);
          },
        },
        {
          key: "profile",
          label: (
            <Link href={PATH.USER.PROFILE(id)}>{t.employees.actions.profile}</Link>
          ),
        },
      ];

      return (
        <>
          {record.id === id ? (
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Button type="text" shape="circle" icon={<EllipsisVertical />} />
            </Dropdown>
          ) : (
            <Link href={PATH.USER.PROFILE(record.id)}>
              <ChevronRight />
            </Link>
          )}
        </>
      );
    },
  },
];
