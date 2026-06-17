import {PATH} from "@/src/shared";
import {NavHeader} from "@/src/widgets";

type UserProfilePageProps = {
  userId: string;
};

export const UserLanguagesPage = ({ userId }: UserProfilePageProps) => {

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
      Languages content
    </section>
  </div>
};
