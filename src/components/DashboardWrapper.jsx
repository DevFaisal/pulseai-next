// "use client";

// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// import { Bell, CircleUser, Heart, Hospital, Menu, Search } from "lucide-react";
// import { Home, Calendar, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useEffect, useState } from "react";
// import { ModeToggle } from "@/components/ModeToggle";
// import Image from "next/image";
// import icon from "@/app/icon/pulse-ai.svg";

// const createNavItem = (label, href, icon, roles) => ({
//   label,
//   href,
//   icon,
//   visible: roles,
// });

// const dashboardLinks = [
//   createNavItem("Patients", "/doctor/patients", Calendar, ["patient"]),
//   createNavItem("Patients", "/admin/patients", Users, ["admin", "doctor"]),
//   createNavItem("Users", "/admin/user", Home, ["admin"]),
//   createNavItem("Doctors", "/admin/doctors", Users, ["admin"]),
// ];

// const getVisibleLinks = (userRole) => {
//   return dashboardLinks.filter((link) => link.visible.includes(userRole));
// };

// export default function DashboardWrapper({ children }) {
//   const [userRole, setUserRole] = useState("admin");
//   const [username, setUsername] = useState("");
//   const [hospitalName, setHospitalName] = useState("");
//   const { data: session } = useSession();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (session?.user) {
//       setUserRole(session.user.role.toLowerCase());
//       setUsername(session.user.name);
//       setHospitalName(session.user.hospitalName);
//     }
//   }, [session]);

//   const navItems = getVisibleLinks(userRole);

//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       await signOut();
//     } catch (error) {
//       console.error("Logout failed: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//       <nav className="hidden border-r bg-muted/40 md:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//             <Link href="/" className="flex items-center gap-2 font-semibold">
//               {/* <Heart className="h-6 w-6 text-primary animate-pulse" />
//               <span>Pulse AI</span> */}
//               <Image src={icon} width={100} height={40} />
//             </Link>
//           </div>
//           <div className="grid items-start px-2 text-sm font-medium lg:px-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
//               >
//                 <item.icon className="h-5 w-5" aria-hidden="true" />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>
//       <div className="flex flex-col">
//         <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="shrink-0 md:hidden"
//                 aria-label="Open navigation menu"
//               >
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Open navigation menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[240px] sm:w-[280px]">
//               <nav className="grid gap-2 text-lg font-medium">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.label}
//                     href={item.href}
//                     className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//                   >
//                     <item.icon className="h-5 w-5" aria-hidden="true" />
//                     <span>{item.label}</span>
//                   </Link>
//                 ))}
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <div className="flex justify-between items-center w-full">
//             <h1 className="text-lg font-semibold">
//               Welcome, <span className="text-primary">{username}</span>
//             </h1>
//             <div className="flex items-center gap-2">
//               <Hospital size={25} aria-hidden="true" />
//               <span className="text-xl font-semibold">
//                 <span className="text-primary">
//                   {hospitalName.split(" ")[0]}
//                 </span>{" "}
//                 <span className="text-red-500">
//                   {hospitalName.split(" ")[1]}
//                 </span>
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <ModeToggle />
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="secondary"
//                     size="icon"
//                     className="rounded-full"
//                     aria-label="Open user menu"
//                   >
//                     <CircleUser className="h-5 w-5" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>Settings</DropdownMenuItem>
//                   <DropdownMenuItem>Support</DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onSelect={handleLogout} disabled={loading}>
//                     {loading ? "Logging out..." : "Logout"}
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </header>
//         <main className="flex-1 overflow-y-auto bg-muted p-4 lg:p-6">
//           <div className="mx-auto max-w-7xl">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  CircleUser,
  Heart,
  Hospital,
  Menu,
  Search,
  Home,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import icon from "@/app/icon/pulse-ai.svg";

const createNavItem = (label, href, icon, roles) => ({
  label,
  href,
  icon,
  visible: roles,
});

const dashboardLinks = [
  createNavItem("Patients", "/doctor/patients", Calendar, ["patient"]),
  createNavItem("Patients", "/admin/patients", Users, ["admin", "doctor"]),
  createNavItem("Users", "/admin/user", Home, ["admin"]),
  createNavItem("Doctors", "/admin/doctors", Users, ["admin"]),
];

const getVisibleLinks = (userRole) => {
  return dashboardLinks.filter((link) => link.visible.includes(userRole));
};

export default function DashboardWrapper({ children }) {
  const [userRole, setUserRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUserRole(session.user.role.toLowerCase());
      setUsername(session.user.name);
      setHospitalName(session.user.hospitalName);
    }
  }, [session]);

  const navItems = getVisibleLinks(userRole);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <nav className="hidden w-64 flex-shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={icon} width={100} height={40} alt="Pulse AI Logo" />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex h-full flex-col">
                  <div className="flex h-16 items-center border-b border-border px-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-semibold"
                    >
                      <Image
                        src={icon}
                        width={100}
                        height={40}
                        alt="Pulse AI Logo"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-1 px-3">
                      {navItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <item.icon
                            className="mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold">
              Welcome, <span className="text-primary">{username}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <Hospital size={20} aria-hidden="true" />
              <span className="text-lg font-semibold">
                <span className="text-primary">
                  {hospitalName.split(" ")[0]}
                </span>{" "}
                <span className="text-destructive">
                  {hospitalName.split(" ")[1]}
                </span>
              </span>
            </div>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <CircleUser className="h-6 w-6" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout} disabled={loading}>
                  {loading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}