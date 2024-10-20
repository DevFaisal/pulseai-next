import { Users, UserCheck, ClipboardList } from "lucide-react";
import { fetchDoctorsPatients } from "@/server/actions/doctors/fetch-doctors";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PatientDiagnosesOverTime from "@/components/patient/PatientDiagnosesOverTime";
import RecentPatients from "@/components/patient/RecentPatients";
import TopCard from "@/components/other/TopCard";

export default async function DoctorDashboard() {
  const { user } = await getServerSession(authOptions);
  const userId = user.id;
  const doctorData = await fetchDoctorsPatients({ userId });

  return (
    <main className=" mx-auto py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <TopCard
          header={doctorData?.data?.patients?.length || 0}
          title="Total Patients"
          description="Currently under remote monitoring"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />

        <TopCard
          header={0}
          title="Diagnosed Patients"
          description="Patients with active diagnoses"
          icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
        />
        <TopCard
          header={0}
          title="Pending Diagnoses"
          description="Patients awaiting diagnosis"
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* <RecentPatients /> */}
        <RecentPatients recentPatients={doctorData?.data?.patients} />
        {/* <PatientDiagnosesOverTime /> */}
        <PatientDiagnosesOverTime />
      </div>
    </main>
  );
}
