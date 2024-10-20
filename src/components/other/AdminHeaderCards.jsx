import { Users, UserPlus } from "lucide-react";
import { fetchDetailsForAdmin } from "@/server/actions/doctors/fetch-doctors";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TopCard from "./TopCard";

export default async function AdminHeaderCards() {
  const { user } = await getServerSession(authOptions);
  const hospitalId = user.hospitalId;
  const { data: details } = await fetchDetailsForAdmin({ hospitalId });

  if (!details) return null;

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
        <TopCard key={title} title={title} header={number} icon={<Icon />} />
      ))}
    </div>
  );
}
