"use client";

import { AuthHeader } from "@/src/widgets/Auth/AuthHeader";
import { AuthPanel } from "@/src/widgets/Auth/AuthPanel";
import { PATH } from "@/src/shared/config/path.config";

export const LoginPage = () => {
    return (
        <main className="min-h-dvh w-full bg-[#f5f5f7]">
            <AuthHeader />

            <AuthPanel
                title="С возвращением"
                subtitle="Рады вас видеть! Войдите, чтобы продолжить"
                primaryButtonText="Войти"
                secondaryButtonText="Забыли пароль"
                secondaryLinkHref={PATH.AUTH.FORGOT_PASSWORD}
            />
        </main>
    );
};