"use client";

import { AuthHeader } from "@/src/widgets/Auth/AuthHeader";
import { AuthPanel } from "@/src/widgets/Auth/AuthPanel";
import { PATH } from "@/src/shared/config/path.config";

export const SignUpPage = () => {
    return (
        <main className="min-h-dvh w-full bg-[#f5f5f7]">
            <AuthHeader />

            <AuthPanel
                title="Зарегистрируйтесь"
                subtitle="Добро пожаловать! Создайте аккаунт, чтобы продолжить"
                primaryButtonText="Создать аккаунт"
                secondaryButtonText="У меня есть аккаунт"
                secondaryLinkHref={PATH.AUTH.LOGIN}
            />
        </main>
    );
};