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
  BriefcaseMedical,
  UserRoundPen,
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
import DashboardSkeleton from "./DashboardSkeleton";
import { Badge } from "@/components/ui/badge";

const createNavItem = (label, href, icon, roles) => ({
  label,
  href,
  icon,
  visible: roles,
});

const dashboardLinks = [
  createNavItem("Dashboard", "/doctor", Home, ["doctor"]),
  createNavItem("Patients", "/doctor/patients", UserRoundPen, ["doctor"]),
  createNavItem("Dashboard", "/admin", Home, ["admin"]),
  createNavItem("Patients", "/admin/patients", UserRoundPen, ["admin"]),
  createNavItem("Doctors", "/admin/doctors", BriefcaseMedical, ["admin"]),
  createNavItem("Users", "/admin/user", Users, ["admin"]),
];

const getVisibleLinks = (userRole) => {
  return dashboardLinks.filter((link) => link.visible.includes(userRole));
};

export default function DashboardWrapper({ children }) {
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
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

  // Wait for session to load before rendering
  if (status === "loading") {
    return <DashboardSkeleton />;
  }

  if (!session?.user) {
    return <div>Unauthorized. Please log in.</div>;
  }

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
            <h1 className="flex text-lg font-semibold items-center justify-center gap-5">
              {userRole === "admin" && (
                <div className="mb-1">
                  <Badge>Admin</Badge>
                </div>
              )}
              <div>
                Welcome, <span className="text-primary">{username}</span>
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <Hospital size={20} aria-hidden="true" />
              <span className="text-lg font-semibold">
                <span className="text-orange-500">
                  {hospitalName.split(" ")[0]}
                </span>{" "}
                <span className="text-">{hospitalName.split(" ")[1]}</span>
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
