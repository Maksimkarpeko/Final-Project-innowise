"use client";
import { PATH, User } from "@/src/shared";
import { Avatar, Button, Dropdown } from "antd";
import { ChevronRight, EllipsisVertical, User as UserIcon } from "lucide-react";
import Link from "next/link";
export const getColumns = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
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
    title: "First Name",
    dataIndex: ["profile", "first_name"],
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: ["profile", "last_name"],
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Department",
    dataIndex: "department_name",
    key: "department_name",
  },
  {
    title: "Position",
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
          label: "Редактировать",
          onClick: () => {
            setIsOpen(true);
          },
        },
        {
          key: "profile",
          label: <Link href={PATH.USER.PROFILE(id)}>Профиль</Link>,
        },
      ];

      return (
        <>
          {record.id === id ? (
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Button type="text" shape="circle" icon={<EllipsisVertical />} />
            </Dropdown>
          ) : (
            <Link href={`/${record.id}`}>
              <ChevronRight />
            </Link>
          )}
        </>
      );
    },
  },
];
