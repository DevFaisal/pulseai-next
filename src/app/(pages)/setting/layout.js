import DashboardWrapper from "@/components/DashboardWrapper";

export const metadata = {
  title: "Settings",
  description: "Settings",
};

export default function SettingLayout({ children }) {
  return (
    <div className="w-full h-screen bg-muted">
      <div className="mx-auto max-w-4xl">{children}</div>
    </div>
  );
}
