"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogOut from "../../components/LogOut";
import HomeComponent from "../../components/HomeComponent";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "2rem",
          right: "8rem",
        }}
      >
        {" "}
        <h5>{session?.user?.name || "User"}</h5>
        <LogOut />
      </div>

      {/* Main Content */}
      <HomeComponent />
    </div>
  );
};

export default HomePage;
