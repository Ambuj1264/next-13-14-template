"use client";
import { useAuth } from "@/context/auth/authContext";
import { StyledLayout } from "@/styles/base";
import { ChildProps } from "@/types/global";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingLayout from "../landingLayout";

export default function AuthLayout({ children }: ChildProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);
  return (
    <LandingLayout>
      <StyledLayout>{children}</StyledLayout>
    </LandingLayout>
  );
}
