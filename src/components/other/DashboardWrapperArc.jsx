"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./ModeToggle";
import icon from "@/assets/images/icon.jpg";

const createNavItem = (label, href, icon, roles) => ({
  label,
  href,
  icon,
  visible: roles,
});

export default function DashboardWrapperAce({ children }) {
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user) {
      setUserRole(session.user.role.toLowerCase());
      setUsername(session.user.name);
      setHospitalName(session.user.hospitalName);
    }
  }, [session]);

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

  if (status === "loading") {
    return <Dashboard />;
  }

  const dashboardLinks = [
    createNavItem(
      "Dashboard",
      "/doctor",
      <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      ["doctor"]
    ),
    createNavItem(
      "Patients",
      "/doctor/patients",
      <UserRoundPen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      ["doctor"]
    ),
    createNavItem(
      "Dashboard",
      "/admin",
      <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      ["admin"]
    ),
    createNavItem(
      "Patients",
      "/admin/patients",
      <UserRoundPen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      ["admin"]
    ),
    createNavItem(
      "Doctors",
      "/admin/doctors",
      <BriefcaseMedical className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      ["admin"]
    ),
    createNavItem(
      "Users",
      "/admin/user",
      <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      ["admin"]
    ),
    createNavItem(
      "Settings",
      "/setting",
      <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      ["admin", "doctor"]
    ),
  ];

  const getVisibleLinks = (userRole) => {
    return dashboardLinks.filter((link) => link.visible.includes(userRole));
  };
  const navItems = getVisibleLinks(userRole);

  if (!session?.user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
          <p className="mb-4">Please log in to access this page.</p>
          <Button asChild>
            <Link href="/">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-muted dark:bg-muted w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between h-screen gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div>
              <Logo />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <SidebarLink key={idx} link={item} />
              ))}
            </div>
            <button onClick={handleLogout} className="mt-2">
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "#",
                  icon: (
                    <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
              />
            </button>
          </div>
          <div>
            <div>
              <ModeToggle />
            </div>
            <SidebarLink
              link={{
                label: username,
                href: "#",
                icon: (
                  <Avatar>
                    <AvatarImage src={session.user.image} alt={username} />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border bg-muted border-neutral-200 dark:border-neutral-700  flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={icon} width={30} height={30} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      className="font-semibold text-xl text-black dark:text-white whitespace-pre"
      >
        Pulse AI
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
