import DashboardWrapper from "../../components/DashboardWrapper";

export const metadata = {
  title: "Dashboard",
  description: "Welcome to the dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DashboardWrapper>
          <div className="w-full h-full">{children}</div>
        </DashboardWrapper>
      </body>
    </html>
  );
}
