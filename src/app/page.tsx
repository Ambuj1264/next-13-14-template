"use client";
import Landing from "@/components/landing/Landing";
import LandingNextSection from "@/components/landing/LandingNextSection";
import { useAuth } from "@/context/auth/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingLayout from "./landingLayout";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);
  return (
    <LandingLayout>
      <Landing />
      <LandingNextSection />
    </LandingLayout>
  );
}
