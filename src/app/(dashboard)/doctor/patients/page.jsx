import PatientList from "@/components/user/PatientList";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { fetchDoctorsPatients } from "@/server/actions/doctors/fetch-doctors";
import NotAvailable from "@/components/other/NotAvailable";

export default async function DoctorDashboard() {
  const { user } = await getServerSession(authOptions);
  const userId = user.id;
  const { data: data } = await fetchDoctorsPatients({ userId });

  return (
    <div>
      <ChildrenWrapper
        title={"Patients"}
        description={"View and manage your patients"}
        LeftComponent={null}
      >
        {data?.patients?.length > 0 ? (
          <PatientList patients={data?.patients} />
        ) : (
          <NotAvailable
            title={"No Patients"}
            description={"You currently have no patients"}
          />
        )}
      </ChildrenWrapper>
    </div>
  );
}
