import { getUserId, PATH } from "@/src/shared";
import { NavHeader } from "@/src/widgets";
import { UserProfile } from "@/src/features";

type UserProfilePageProps = {
  userId: string;
};

export const UserProfilePage = ({ userId }: UserProfilePageProps) => {
  const currentUserId = getUserId();
  const canEdit = currentUserId === userId;

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

  return (
    <div className="w-full px-6">
      <NavHeader items={navItems} />
        <section className="mt-6 w-full">
            <UserProfile userId={userId} canEdit={canEdit} />
        </section>
     </div>
    );
};
