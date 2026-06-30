export type UserIdPageProps = {
    params: Promise<{
        userId: string;
    }>;
};

export type UserCvIdPageProps = {
    params: Promise<{
        userId: string;
        cvId: string;
    }>;
}