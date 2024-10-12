import AppBar from "@/components/other/AppBar";
import React from "react";

export default function UserLayout({ children }) {
  return (
    <main className="bg-muted min-h-screen">
      <AppBar />
      <div className="max-w-[94%] mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
