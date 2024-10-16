import DashboardWrapper from "@/components/other/DashboardWrapper";
import DashboardWrapperAce from "@/components/other/DashboardWrapperArc";
import ErrorBoundary from "./ErrorBoundary";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

const { user } = await getServerSession(NEXT_AUTH);
const hospitalName = user.hospitalName;

export const metadata = {
  title: `Dashboard - ${hospitalName}`,
  description: `Welcome to the dashboard of ${hospitalName}`,
};

export default function RootLayout({ children }) {
  return (
    // <DashboardWrapper>
    <DashboardWrapperAce>
      <ErrorBoundary>
        <div className="w-full h-full mx-auto max-w-8xl">{children}</div>
      </ErrorBoundary>
    </DashboardWrapperAce>
    // </DashboardWrapper>
  );
}
