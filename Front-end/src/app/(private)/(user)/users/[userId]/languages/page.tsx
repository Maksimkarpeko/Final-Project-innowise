import { UserLanguagesPage } from "@/src/views";
import { UserIdPageProps } from "@/src/shared";

const Page = async ({ params }: UserIdPageProps) => {
  const { userId } = await params;

  return <UserLanguagesPage userId={userId} />;
};

export default Page;
