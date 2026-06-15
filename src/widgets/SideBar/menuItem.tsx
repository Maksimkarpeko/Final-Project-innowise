import { MenuProps } from "antd";
import { FileUser, Languages, Users } from "lucide-react";
import { SkillsIcon } from "@/src/shared";
import Image from "next/image";

type MenuItem = Required<MenuProps>["items"][number];

export const items: MenuItem[] = [
  {
    key: "employees",
    icon: <Users size={24} className="pr-1" fill="#7a7a7a" color="#7a7a7a" />,
    label: "Employees",
  },
  {
    key: "skills",
    icon: <Image src={SkillsIcon} alt="Skills" />,
    label: "Skills",
  },
  {
    key: "languages",
    icon: <Languages size={24} className="pr-1" color="#7a7a7a" />,
    label: "Languages",
  },
  {
    key: "CVs",
    icon: <FileUser size={24} className="pr-1" color="#7a7a7a" />,
    label: "CVs",
  },
];
