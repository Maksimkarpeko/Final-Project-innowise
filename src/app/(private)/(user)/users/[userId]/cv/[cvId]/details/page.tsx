import {UserCvIdPageProps} from "@/src/shared";
import { CVSDetailsPage } from "@/src/views";

const Page = async ({ params }: UserCvIdPageProps) => {
  const { userId } = await params;
  const { cvId } = await params;

  return <CVSDetailsPage userId={userId} cvId={cvId} />;
};

export default Page;
