"use client";

import { ResetPasswordForm } from "@/src/features";
import { AuthHeader } from "@/src/widgets";

export const ResetPasswordPage = () => {
    return (
        <>
            <AuthHeader />

            <section className="flex justify-center bg-[#f5f5f7] px-4">
                <ResetPasswordForm />
            </section>
        </>
    );
};