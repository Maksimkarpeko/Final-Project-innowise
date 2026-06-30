import { UserCvIdPageProps } from "@/src/shared";
import { UserSkillsPage } from "@/src/views";

const Page = async ({ params }: UserCvIdPageProps) => {
  const { userId } = await params;
  const { cvId } = await params;

  return <UserSkillsPage  currentCvUserId={cvId} />;
};

export default Page;
