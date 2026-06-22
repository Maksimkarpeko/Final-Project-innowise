import {UserCvIdPageProps} from "@/src/shared";
import {CVSDetailsPage} from "@/src/views/user/cvs/details/CVSDetails";

const Page = async ({ params }: UserCvIdPageProps) => {
  const { userId } = await params;
  const { cvId } = await params;

  return <CVSDetailsPage userId={userId} cvId={cvId} />;
};

export default Page;
