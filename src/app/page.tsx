"use client"
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { PATH } from "../shared/config/path.config";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold uppercase">hello user</h1>
      <div className="mt-4">
        <Button
          type="primary"
          className="mr-4"
          size="large"
          onClick={() => router.push(PATH.AUTH.LOGIN)}
        >
          Login
        </Button>
        <Button
          type="default"
          size="large"
          onClick={() => router.push(PATH.AUTH.REGISTER)}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
