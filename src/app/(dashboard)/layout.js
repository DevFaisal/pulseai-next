import DashboardWrapper from "@/components/other/DashboardWrapper";
import DashboardWrapperAce from "@/components/other/DashboardWrapperArc";

export const metadata = {
  title: "Dashboard",
  description: "Welcome to the dashboard",
};

export default function RootLayout({ children }) {
  return (
    // <DashboardWrapper>
    <DashboardWrapperAce>
      <div className="w-full h-full mx-auto max-w-8xl">{children}</div>
    </DashboardWrapperAce>
    // </DashboardWrapper>
  );
}
