import DashboardWrapperAce from "@/components/other/DashboardWrapperArc";
import ErrorBoundary from "./ErrorBoundary";

export const metadata = {
  title: `Dashboard `,
  description: `Welcome to the dashboard. Here you can view and manage your patients, view your appointments, and more.`,
};

export default function RootLayout({ children }) {
  return (
    <DashboardWrapperAce>
      <ErrorBoundary>
        <div className="w-full h-full min-h-screen overflow-y-scroll mx-auto max-w-8xl">
          {children}
        </div>
      </ErrorBoundary>
    </DashboardWrapperAce>
  );
}
