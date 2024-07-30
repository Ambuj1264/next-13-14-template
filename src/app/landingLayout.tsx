import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ChildProps } from "@/types/global";
import React from "react";

const LandingLayout = ({ children }: ChildProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer showContent={true} />
    </>
  );
};

export default LandingLayout;
