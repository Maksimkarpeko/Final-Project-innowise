import { CVProjectsPage } from "@/src/views";

type PageProps = {
    params: Promise<{
        userId: string;
        cvId: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { userId, cvId } = await params;

    return <CVProjectsPage userId={userId} cvId={cvId} />;
}