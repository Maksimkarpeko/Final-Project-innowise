import { UserIdPageProps } from "@/src/shared";
import { UserSkillsPage } from "@/src/views";

const Page = async ({ params }: UserIdPageProps) => {
  const { userId } = await params;

  return <UserSkillsPage userId={userId} />;
};
export default Page;
