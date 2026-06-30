import { UserCvIdPageProps } from "@/src/shared";
import { CVPreview } from "@/src/views";

const Page = async ({ params }: UserCvIdPageProps) => {
  const { userId } = await params;
  const { cvId } = await params;

  return <CVPreview userId={userId} cvId={cvId} />;
};

export default Page;
