import { MenuProps } from "antd";
import { FileUser, Languages, Users } from "lucide-react";
import { PATH, SkillsIcon } from "@/src/shared";
import Image from "next/image";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

export const items: MenuItem[] = [
  {
    key: PATH.USER.LIST,
    icon: <Users size={24} className="pr-1" fill="#7a7a7a" color="#7a7a7a" />,
    label: <Link href={PATH.USER.LIST}>Employees</Link>,
  },
  {
    key: PATH.USER.SKILLS,
    icon: <Image src={SkillsIcon} alt="Skills" />,
    label: <Link href={PATH.USER.SKILLS}>Skills</Link>,
  },
  {
    key: PATH.USER.LANGUAGES,
    icon: <Languages size={24} className="pr-1" color="#7a7a7a" />,
    label: <Link href={PATH.USER.LANGUAGES}>Languages</Link>,
  },
  {
    key: PATH.USER.CVS,
    icon: <FileUser size={24} className="pr-1" color="#7a7a7a" />,
    label: <Link href={PATH.USER.CVS}>CVs</Link>,
  },
];
