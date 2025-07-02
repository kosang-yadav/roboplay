import React from "react";

export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
