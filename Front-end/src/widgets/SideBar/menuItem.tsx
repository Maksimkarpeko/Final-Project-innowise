import { MenuProps } from "antd";
import { FileUser, Languages, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PATH, SkillsIcon, Translations } from "@/src/shared";

export const getItems = (
  id?: string | null,
  t?: Translations,
): MenuProps["items"] => {
  const items: MenuProps["items"] = [
    {
      key: PATH.USER.LIST,
      icon: (
        <Users size={24} className="pr-1" fill="#7a7a7a" color="#7a7a7a" />
      ),
      label: (
        <Link href={PATH.USER.LIST}>
          {t?.sidebar.menu.employees ?? "Employees"}
        </Link>
      ),
    },
  ];

  if (!id) {
    return items;
  }

  return [
    ...items,
    {
      key: PATH.USER.SIDE_SKILLS,
      icon: (
          <Image
              src={SkillsIcon}
              alt="Skills"
              width={24}
              height={24}
              className="
                skills-menu-icon
                h-6
                w-6
                shrink-0
                object-contain
                brightness-0
                opacity-60
                transition
                dark:invert
      "
          />
      ),
      label: (
          <Link href={PATH.USER.SIDE_SKILLS}>
            {t?.sidebar.menu.skills ?? "Skills"}
          </Link>
      ),
    },
    {
      key: PATH.USER.SIDE_LANGUAGES,
      icon: <Languages size={24} className="pr-1" color="#7a7a7a" />,
      label: (
        <Link href={PATH.USER.SIDE_LANGUAGES}>
          {t?.sidebar.menu.languages ?? "Languages"}
        </Link>
      ),
    },
    {
      key: PATH.USER.CV.LIST(id),
      icon: <FileUser size={24} className="pr-1" color="#7a7a7a" />,
      label: (
        <Link href={PATH.USER.CV.LIST(id)}>{t?.sidebar.menu.cvs ?? "CVs"}</Link>
      ),
    },
  ];
};
