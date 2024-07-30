"use client";
import ChangePassword from "@/components/auth/ResetPassword/ChangePassword";
import React from "react";

const page = ({ params }: { params: { token: string } }) => {
  return <ChangePassword token={params.token} />;
};

export default page;
