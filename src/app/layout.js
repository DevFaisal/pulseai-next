import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Providers from "@/context/Providers";

import RecoilRootProvider from "@/context/RecoilRootProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { icons } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export const metadata = {
  title: "Pulse AI - Smarter health starts here",
  description: "AI-powered healthcare",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <Toaster />
              <RecoilRootProvider>{children}</RecoilRootProvider>
            </Providers>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
