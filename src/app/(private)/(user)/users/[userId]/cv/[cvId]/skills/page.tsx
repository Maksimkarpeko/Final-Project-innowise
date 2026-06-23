import { UserCvIdPageProps } from "@/src/shared";
import { CVSkillsPage } from "@/src/views";

const Page = async ({ params }: UserCvIdPageProps) => {
    const { userId } = await params;
    const { cvId } = await params;

    return <CVSkillsPage userId={userId} cvId={cvId} />;
};

export default Page;