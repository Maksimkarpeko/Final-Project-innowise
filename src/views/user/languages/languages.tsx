import { LanguagesPage } from "@/src/features"
import {PATH} from "@/src/shared";
import {NavHeader} from "@/src/widgets";

type UserProfilePageProps = {
  userId?: string;
};

export const UserLanguagesPage = ({ userId }: UserProfilePageProps) => {

  if (!userId) {
    return <section className="px-6 w-full">
      <LanguagesPage/>
    </section>;
  }

  const navItems = [
    {
      content: "Profile",
      href: PATH.USER.PROFILE(userId),
    },
    {
      content: "Skills",
      href: PATH.USER.SKILLS(userId),
    },
    {
      content: "Languages",
      href: PATH.USER.LANGUAGES(userId),
    },
  ];

  return <div className="w-full px-6">
      <NavHeader items={navItems} />
      <section className="mt-6 w-full">
        <LanguagesPage userId={userId} />
      </section>
    </div>
};
