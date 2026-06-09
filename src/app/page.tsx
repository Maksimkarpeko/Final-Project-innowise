import { redirect } from "next/navigation";
import { PATH } from "@/src/shared/config/path.config";

export default function Home() {
    redirect(PATH.AUTH.LOGIN);
}