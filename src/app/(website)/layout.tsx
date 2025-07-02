import React from "react";
import LandingPageNavbar from "./_components/navbar";

export default function websiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="flex flex-col py-10 px-10 ">
    <div className="flex flex-col py-10 px-10 container">
      <LandingPageNavbar />
      {children}
    </div>
  );
}
