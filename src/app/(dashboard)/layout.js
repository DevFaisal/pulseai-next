import DashboardWrapperAce from "@/components/other/DashboardWrapperArc";
import ErrorBoundary from "./ErrorBoundary";
import { hospitalName } from "@/lib/values";

export const metadata = {
  title: `Dashboard - `,
  description: `Welcome to the dashboard of `,
};

export default function RootLayout({ children }) {
  return (
    <DashboardWrapperAce>
      <ErrorBoundary>
        <div className="w-full h-full overflow-scroll mx-auto max-w-8xl">{children}</div>
      </ErrorBoundary>
    </DashboardWrapperAce>
  );
}
