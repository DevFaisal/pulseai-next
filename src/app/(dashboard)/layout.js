import DashboardWrapper from "@/components/DashboardWrapper";
import DashboardWrapperAce from "@/components/DashboardWrapperArc";

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
