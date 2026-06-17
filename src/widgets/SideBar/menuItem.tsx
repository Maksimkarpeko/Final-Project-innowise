import { MenuProps } from "antd";
import { FileUser, Languages, Users } from "lucide-react";
import { PATH, SkillsIcon } from "@/src/shared";
import Image from "next/image";
import Link from "next/link";

export const getItems = (id: string): MenuProps["items"] => {
  return [
    {
      key: PATH.USER.LIST,
      icon: <Users size={24} className="pr-1" fill="#7a7a7a" color="#7a7a7a" />,
      label: <Link href={PATH.USER.LIST}>Employees</Link>,
    },
    {
      key: PATH.USER.SKILLS(id),
      icon: <Image src={SkillsIcon} alt="Skills" />,
      label: <Link href={PATH.USER.SKILLS(id)}>Skills</Link>,
    },
    {
      key: PATH.USER.LANGUAGES(id),
      icon: <Languages size={24} className="pr-1" color="#7a7a7a" />,
      label: <Link href={PATH.USER.LANGUAGES(id)}>Languages</Link>,
    },
    {
      key: PATH.USER.CVS,
      icon: <FileUser size={24} className="pr-1" color="#7a7a7a" />,
      label: <Link href={PATH.USER.CVS}>CVs</Link>,
    },
  ];
};
