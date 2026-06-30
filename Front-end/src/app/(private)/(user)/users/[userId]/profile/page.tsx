import { UserProfilePage } from "@/src/views";
import { UserIdPageProps } from "@/src/shared";

const Page = async ({ params }: UserIdPageProps) => {
  const { userId } = await params;

  return <UserProfilePage userId={userId} />;
};

export default Page;