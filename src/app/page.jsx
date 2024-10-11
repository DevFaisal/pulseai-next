import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Bell, PlusCircle, Activity, Lock } from "lucide-react";
import AppBar from "@/components/AppBar";
import Login from "@/components/Login";
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

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import { ChevronDown, Moon, Sun, Volume2, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import AppBar from "@/components/AppBar";

// export default function PulseAILandingPage() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [activeFeature, setActiveFeature] = useState("realtime");

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const fullHeight = document.documentElement.scrollHeight;
//       const progress = (scrollPosition / (fullHeight - windowHeight)) * 100;
//       setScrollProgress(progress);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const features = {
//     realtime: {
//       title: "Real-time Monitoring",
//       description: "Access live patient data and vitals instantly.",
//     },
//     ai: {
//       title: "AI-Powered Insights",
//       description: "Get predictive analytics and personalized recommendations.",
//     },
//     secure: {
//       title: "Secure Communication",
//       description: "Collaborate securely with end-to-end encryption.",
//     },
//   };

//   return (
//     <div
//       className={`min-h-screen ${
//         darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
//       }`}
//     >
//       {/* <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm">
//         <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="text-2xl font-bold">Pulse AI</div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost">Features</Button>
//             <Button variant="ghost">Pricing</Button>
//             <Button variant="ghost">About</Button>
//             <Button variant="outline">Login</Button>
//             <Switch
//               checked={darkMode}
//               onCheckedChange={setDarkMode}
//               id="dark-mode-toggle"
//             />
//             <Label htmlFor="dark-mode-toggle" className="sr-only">
//               Toggle dark mode
//             </Label>
//             {darkMode ? (
//               <Moon className="h-5 w-5" />
//             ) : (
//               <Sun className="h-5 w-5" />
//             )}
//           </div>
//         </nav>
//       </header> */}
//       <AppBar />
//       <main>
//         {/* Hero Section */}
//         <section className="relative h-screen flex items-center justify-center overflow-hidden">
//           <div className="absolute inset-0 z-0">
//             <img
//               src="https://images.pexels.com/photos/25626516/pexels-photo-25626516/free-photo-of-molecular-model-graphic-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//               alt="AI in Healthcare"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black opacity-50"></div>
//           </div>
//           <div className="relative z-10 text-center text-white">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-5xl md:text-7xl font-bold mb-6"
//             >
//               AI-Driven Health Management: <br />
//               <span className="text-primary">Smarter, Faster, Safer</span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-xl md:text-2xl mb-8"
//             >
//               Transform healthcare with cutting-edge AI technology
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="flex justify-center space-x-4"
//             >
//               <Button size="lg" className="bg-primary hover:bg-primary/90">
//                 Get Started
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="text-black border-white hover:bg-white hover:text-white"
//               >
//                 Learn More
//               </Button>
//             </motion.div>
//           </div>
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ repeat: Infinity, duration: 1.5 }}
//             className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           >
//             <ChevronDown className="h-8 w-8 text-white" />
//           </motion.div>
//         </section>

//         {/* Features Section */}
//         <section className="py-20 bg-gray-50 dark:bg-gray-800">
//           <div className="container mx-auto px-4">
//             <h2 className="text-4xl font-bold text-center mb-12">
//               Key Features
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {["Admin", "Doctor", "Patient"].map((role) => (
//                 <motion.div
//                   key={role}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   viewport={{ once: true }}
//                 >
//                   <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
//                     <CardHeader>
//                       <CardTitle>{role} Dashboard</CardTitle>
//                       <CardDescription>
//                         Tailored features for {role.toLowerCase()}s
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <Accordion type="single" collapsible>
//                         <AccordionItem value="feature-1">
//                           <AccordionTrigger>
//                             Real-time Monitoring
//                           </AccordionTrigger>
//                           <AccordionContent>
//                             Access live patient data, vitals, and AI-powered
//                             insights instantly.
//                           </AccordionContent>
//                         </AccordionItem>
//                         <AccordionItem value="feature-2">
//                           <AccordionTrigger>
//                             Predictive Analytics
//                           </AccordionTrigger>
//                           <AccordionContent>
//                             Leverage AI to forecast patient outcomes and
//                             optimize care plans.
//                           </AccordionContent>
//                         </AccordionItem>
//                         <AccordionItem value="feature-3">
//                           <AccordionTrigger>
//                             Secure Communication
//                           </AccordionTrigger>
//                           <AccordionContent>
//                             Collaborate securely with team members and patients
//                             through encrypted channels.
//                           </AccordionContent>
//                         </AccordionItem>
//                       </Accordion>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Interactive Feature Showcase */}
//         <section className="py-20 bg-white dark:bg-gray-900">
//           <div className="container mx-auto px-4">
//             <h2 className="text-4xl font-bold text-center mb-12">
//               Experience the Power of Pulse AI
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//               <div>
//                 <Tabs
//                   value={activeFeature}
//                   onValueChange={setActiveFeature}
//                   className="w-full"
//                 >
//                   <TabsList className="grid w-full grid-cols-3">
//                     <TabsTrigger value="realtime">Real-time</TabsTrigger>
//                     <TabsTrigger value="ai">AI Insights</TabsTrigger>
//                     <TabsTrigger value="secure">Security</TabsTrigger>
//                   </TabsList>
//                   {Object.entries(features).map(([key, feature]) => (
//                     <TabsContent key={key} value={key}>
//                       <Card>
//                         <CardHeader>
//                           <CardTitle>{feature.title}</CardTitle>
//                           <CardDescription>
//                             {feature.description}
//                           </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                           <Button
//                             onClick={() =>
//                               console.log(`Explore ${feature.title}`)
//                             }
//                           >
//                             Explore Feature{" "}
//                             <ArrowRight className="ml-2 h-4 w-4" />
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     </TabsContent>
//                   ))}
//                 </Tabs>
//               </div>
//               <div className="relative h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
//                 <motion.img
//                   key={activeFeature}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                   src={`/placeholder.svg?text=${features[activeFeature].title}&width=600&height=400`}
//                   alt={features[activeFeature].title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Trust & Security Section */}
//         <section className="py-20 bg-gray-50 dark:bg-gray-800">
//           <div className="container mx-auto px-4">
//             <h2 className="text-4xl font-bold text-center mb-12">
//               Trust & Security
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Data Protection</CardTitle>
//                     <CardDescription>Your data is safe with us</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="list-disc pl-5 space-y-2">
//                       <li>HIPAA Compliant</li>
//                       <li>End-to-end encryption</li>
//                       <li>Regular security audits</li>
//                       <li>Secure cloud storage</li>
//                     </ul>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Certifications</CardTitle>
//                     <CardDescription>
//                       Recognized for our commitment to security
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-2 gap-4">
//                       <img
//                         src="/placeholder.svg?height=60&width=60"
//                         alt="HIPAA Certified"
//                         className="h-15 w-15"
//                       />
//                       <img
//                         src="/placeholder.svg?height=60&width=60"
//                         alt="ISO 27001"
//                         className="h-15 w-15"
//                       />
//                       <img
//                         src="/placeholder.svg?height=60&width=60"
//                         alt="GDPR Compliant"
//                         className="h-15 w-15"
//                       />
//                       <img
//                         src="/placeholder.svg?height=60&width=60"
//                         alt="SOC 2 Type II"
//                         className="h-15 w-15"
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action Section */}
//         <section className="py-20 bg-primary text-primary-foreground">
//           <div className="container mx-auto px-4 text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-4xl font-bold mb-6">
//                 Ready to Transform Healthcare?
//               </h2>
//               <p className="text-xl mb-8">
//                 Join the AI-powered health revolution today
//               </p>
//               <Button size="lg" variant="secondary">
//                 Start Your Free Trial
//               </Button>
//             </motion.div>
//           </div>
//         </section>
//       </main>

//       <footer className="bg-gray-100 dark:bg-gray-900 py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-4">About Pulse AI</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Our Story
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Team
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Press
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Products</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     For Hospitals
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     For Clinics
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     For Patients
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Integrations
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Whitepapers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Case Studies
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Help Center
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Support
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Sales
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:underline">
//                     Partnerships
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p>&copy; 2024 Pulse AI. All rights reserved.</p>
//               <div className="flex space-x-4 mt-4 md:mt-0">
//                 <Link href="#" className="hover:text-primary">
//                   Terms of Service
//                 </Link>
//                 <Link href="#" className="hover:text-primary">
//                   Privacy Policy
//                 </Link>
//                 <Link href="#" className="hover:text-primary">
//                   Cookie Policy
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll Progress Indicator */}
//       <Progress
//         value={scrollProgress}
//         className="fixed top-0 left-0 right-0 z-50 h-1"
//       />
//     </div>
//   );
// }
