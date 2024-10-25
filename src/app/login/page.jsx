import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Bell, PlusCircle, Activity, Lock } from "lucide-react";
import AppBar from "@/components/other/AppBar";
import Login from "@/components/other/Login";
import Link from "next/link";

const features = [
  {
    icon: Users,
    title: "User Management",
    description:
      "Efficiently manage doctors, patients, and staff within your hospital network.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Receive instant alerts when patient vitals exceed thresholds.",
  },
  {
    icon: PlusCircle,
    title: "Medication Management",
    description: "Prescribe and adjust medications for patients with ease.",
  },
  {
    icon: Activity,
    title: "Vital Monitoring",
    description:
      "Track and analyze patient vitals in real-time for better care.",
  },
  {
    icon: Lock,
    title: "Secure Access",
    description: "Role-based access control ensures data privacy and security.",
  },
  {
    icon: Heart,
    title: "Chronic Disease Management",
    description: "Specialized tools for managing long-term health conditions.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-accent">
      <AppBar />
      <main className="flex-1">
        <section className="w-full md:px-20 h-screen flex items-center pb-36">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Empowering Healthcare with{" "}
                  <span className="bg-gradient-to-tl from-red-500 to-primary-600 text-transparent bg-clip-text">
                    AI
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-primary md:text-xl">
                  Enhance patient outcomes with seamless, personalized
                  care—anytime, anywhere.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 pt-10">
                <Login />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background md:px-20">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-primary-900">
              Key Features
            </h2>
            <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="border-primary-100">
                  <CardHeader>
                    <feature.icon
                      className="w-6 h-6 mb-2 text-primary-600"
                      aria-hidden="true"
                    />
                    <CardTitle className="text-primary-800">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-primary-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-primary-100 bg-white">
        <p className="text-xs text-primary-600">
          © {new Date().getFullYear()} Pulse AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-primary-600 hover:text-primary-800"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-primary-600 hover:text-primary-800"
            href="/privacy"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
