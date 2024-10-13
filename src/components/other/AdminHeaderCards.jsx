"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus } from "lucide-react";
import { useRecoilValue } from "recoil";
import { adminDashboardDetailsSelector } from "@/store/HospitalAtom";

export default function AdminHeaderCards() {
  const details = useRecoilValue(adminDashboardDetailsSelector);

  const hospitalStats = [
    {
      title: "Total Doctors",
      icon: UserPlus,
      number: details.doctors,
    },
    {
      title: "Total Patients",
      icon: Users,
      number: details.patients,
    },
    {
      title: "Total Users",
      icon: Users,
      number: details.users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {hospitalStats.map(({ title, icon: Icon, number }) => (
        <HeaderCard key={title} title={title} Icon={Icon} number={number} />
      ))}
    </div>
  );
}

function HeaderCard({ title, Icon, number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{number}</div>
      </CardContent>
    </Card>
  );
}
