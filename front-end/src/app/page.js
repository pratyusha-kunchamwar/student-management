"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LogIn from "../components/LogIn";

const MyApp = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/homePage");
    }
  }, [session, router]);
  if (session) {
    return null; //while redirection stop any thing to render
  }

  return (
    <div>
      <LogIn />
    </div>
  );
};

export default MyApp;
