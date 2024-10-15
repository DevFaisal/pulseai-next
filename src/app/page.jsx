"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Heart, Users, UserCog } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PulseAILandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-background text-foreground dark:from-violet-950 dark:to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl text-nowrap font-semibold tracking-tight sm:text-6xl py-4 text-violet-800 dark:text-violet-200">
              Pulse AI | Health Management
            </h1>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4 text-muted-foreground">
              {"AI-Powered Health Management"}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Accurate symptom analysis & real-time insights for proactive care.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600">
                Get Started
              </Button>
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-950"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 0 L50 100 L100 0 Z" fill="url(#hero-gradient)" />
          </svg>
          <defs>
            <linearGradient
              id="hero-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--violet-600)" />
              <stop offset="100%" stopColor="var(--violet-800)" />
            </linearGradient>
          </defs>
        </div>
      </section>

      {/* Role-Based Information Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Admin",
                icon: UserCog,
                description: "Manage doctors and patients with ease",
              },
              {
                title: "Doctor",
                icon: Users,
                description: "Access real-time patient data and insights",
              },
              {
                title: "Remote User",
                icon: Heart,
                description: "Track every patient's health from anywhere",
              },
            ].map((role) => (
              <Card
                key={role.title}
                className="border-violet-200 dark:border-violet-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-violet-400 dark:hover:border-violet-600"
              >
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 text-violet-600 dark:text-violet-400">
                    <role.icon className="w-full h-full" />
                  </div>
                  <CardTitle className="text-center text-xl font-semibold">
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {role.description}
                  </CardDescription>
                  <div className="mt-4 text-center">
                    <Button
                      variant="link"
                      className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Powerful Features for Modern Healthcare
              </h2>
              <ul className="space-y-4">
                {[
                  "Add and manage doctors and patients with ease",
                  "Track real-time patient vitals",
                  "Seamless integration with hospital databases",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="h-6 w-6 text-violet-600 dark:text-violet-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1661764570116-b1b0a2da783c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Pulse AI Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
            Experience Pulse AI in Action
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Real-time Vitals Monitoring",
                image:
                  "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Patient-Doctor Mapping",
                image:
                  "https://plus.unsplash.com/premium_photo-1661768688743-cb95ec8e9ebd?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Alerts and Health Thresholds",
                image:
                  "https://plus.unsplash.com/premium_photo-1723489337127-10940e9dc593?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-violet-200 dark:border-violet-800 transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-40 object-cover rounded-t-lg dark:opacity-80"
                />
                <CardHeader>
                  <CardTitle className="text-center text-lg">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Pulse AI has revolutionized how we manage patient care.",
                name: "Dr. Emily Chen",
                role: "Cardiologist",
              },
              {
                quote:
                  "The real-time insights have been invaluable for our hospital.",
                name: "John Smith",
                role: "Hospital Administrator",
              },
              {
                quote:
                  "I feel more connected to my healthcare team than ever before.",
                name: "Sarah Johnson",
                role: "Patient",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="pt-6">
                  <blockquote className="text-center text-card-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-6 text-center">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="bg-violet-600 dark:bg-violet-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Transform Healthcare with Pulse AI
          </h2>
          <Button className="bg-white text-violet-600 hover:bg-gray-100 dark:bg-violet-200 dark:text-violet-900 dark:hover:bg-violet-100">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-violet-900 dark:bg-violet-950 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img
                src="https://pulsehealthcare.ai/pulse-ai.svg"
                alt="Pulse AI Logo"
                className="h-8 dark:invert"
              />
            </div>
            <nav className="flex gap-6">
              <Link href="#" className="hover:text-violet-300">
                Contact
              </Link>
              <Link href="#" className="hover:text-violet-300">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-violet-300">
                Terms of Service
              </Link>
            </nav>
            <div className="mt-4 md:mt-0 flex gap-4">
              {["facebook", "twitter", "linkedin"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="text-white hover:text-violet-300"
                >
                  <span className="sr-only">{social}</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} Pulse AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
