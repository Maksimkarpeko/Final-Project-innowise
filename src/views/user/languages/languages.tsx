import { LanguagesPage } from "@/src/features"

type UserProfilePageProps = {
  userId: string;
};

export const UserLanguagesPage = ({ userId }: UserProfilePageProps) => {
  return <div className="w-full px-6 py-8 md:px-10">
    <LanguagesPage userId={userId} />
  </div>
};
