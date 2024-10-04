import DashboardWrapper from "@/components/DashboardWrapper";

export const metadata = {
  title: "Dashboard",
  description: "Welcome to the dashboard",
};

export default function SettingLayout({ children }) {
  return (
    <div className="w-full h-screen bg-muted">
      <div className="mx-auto max-w-4xl">{children}</div>
    </div>
  );
}
