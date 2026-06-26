import { UserSkillsPage } from "@/src/views";
import {UserIdPageProps} from "@/src/shared";

const Page = async ({ params }: UserIdPageProps) => {

  const { userId } = await params;

  return <UserSkillsPage currentUserId={userId} />;
};

export default Page;
