import { MenuProps } from "antd";
import { FileUser, Languages, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PATH, SkillsIcon } from "@/src/shared";

export const getItems = (id?: string | null,): MenuProps["items"] => {
  const items: MenuProps["items"] = [
    {
      key: PATH.USER.LIST,
      icon: (
          <Users size={24} className="pr-1" fill="#7a7a7a" color="#7a7a7a" />
      ),
      label: <Link href={PATH.USER.LIST}>Employees</Link>,
    },
  ];

  if (!id) {
    return items;
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