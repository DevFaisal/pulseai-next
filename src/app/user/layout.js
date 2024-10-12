import AppBar from "@/components/other/AppBar";

export const metadata = {
  title: "User Dashboard - Pulse AI",
  description: "AI-powered healthcare",
};

export default function UserLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <AppBar />
        </nav>
        <main className="bg-muted min-h-screen">
          <div className="max-w-[94%] mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
