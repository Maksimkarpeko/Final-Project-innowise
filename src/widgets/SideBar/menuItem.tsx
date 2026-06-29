import { MenuProps } from "antd";
import {
  BriefcaseBusiness,
  Building2,
  FileUser,
  Folders,
  Languages,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PATH, SkillsIcon, UserRole } from "@/src/shared";

export const getItems = (
  role: UserRole,
  id?: string | null,
): MenuProps["items"] => {
  const items: MenuProps["items"] = [
    {
      key: PATH.USER.LIST,
      icon: <Users size={24} className="pr-1" fill="#7a7a7a" color="#7a7a7a" />,
      label: <Link href={PATH.USER.LIST}>Employees</Link>,
    },
  ];
  if (!id) {
    return items;
  }
  if (role === "Admin") {
    return [
      ...items,
      {
        key: PATH.ADMIN.PROJECTS,
        icon: <Folders size={24} className="pr-1" color="#7a7a7a" />,
        label: <Link href={PATH.ADMIN.PROJECTS}>Projects</Link>,
      },
      {
        key: PATH.USER.CV.LIST(id),
        icon: <FileUser size={24} className="pr-1" color="#7a7a7a" />,
        label: <Link href={PATH.USER.CV.LIST(id)}>CVs</Link>,
      },
      {
        type: "divider",
      },
      {
        key: PATH.ADMIN.DEPARTMENTS,
        icon: <Building2 size={24} className="pr-1" color="#7a7a7a" />,
        label: <Link href={PATH.ADMIN.DEPARTMENTS}>Departments</Link>,
      },
      {
        key: PATH.ADMIN.POSITIONS,
        icon: <BriefcaseBusiness size={24} className="pr-1" color="#7a7a7a" />,
        label: <Link href={PATH.ADMIN.POSITIONS}>Positions</Link>,
      },
      {
        key: PATH.ADMIN.SKILLS,
        icon: <Image src={SkillsIcon} alt="Skills" />,
        label: <Link href={PATH.ADMIN.SKILLS}>Skills</Link>,
      },
      {
        key: PATH.ADMIN.LANGUAGES,
        icon: <Languages size={24} className="pr-1" color="#7a7a7a" />,
        label: <Link href={PATH.ADMIN.LANGUAGES}>Languages</Link>,
      },
    ];
  }
  return [
    ...items,
    {
      key: PATH.USER.SIDE_SKILLS,
      icon: <Image src={SkillsIcon} alt="Skills" />,
      label: <Link href={PATH.USER.SIDE_SKILLS}>Skills</Link>,
    },
    {
      key: PATH.USER.SIDE_LANGUAGES,
      icon: <Languages size={24} className="pr-1" color="#7a7a7a" />,
      label: <Link href={PATH.USER.SIDE_LANGUAGES}>Languages</Link>,
    },
    {
      key: PATH.USER.CV.LIST(id),
      icon: <FileUser size={24} className="pr-1" color="#7a7a7a" />,
      label: <Link href={PATH.USER.CV.LIST(id)}>CVs</Link>,
    },
  ];
};
