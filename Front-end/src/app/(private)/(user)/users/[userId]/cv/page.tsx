import { UserCVSPage } from "@/src/views";
import {UserIdPageProps} from "@/src/shared";

const Page = async ({ params }: UserIdPageProps) => {
    const { userId } = await params;

    return <UserCVSPage userId={userId} />;
};

export default Page;
