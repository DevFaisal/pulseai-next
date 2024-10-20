import PatientTable from "@/components/patient/PatientTable";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import AddPatientButton from "@/components/other/AddPatientButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchPatients } from "@/server/actions/patients/fetch-patients";
import NotAvailable from "@/components/other/NotAvailable";

export default async function Patients() {
  const { user } = await getServerSession(authOptions);
  const hospitalId = user.hospitalId;
  const patients = await fetchPatients({ hospitalId });

  return (
    <ChildrenWrapper
      title={"Patients"}
      description={"Manage and view patient details"}
      LeftComponent={() => <AddPatientButton />}
    >
      <div>
        {patients?.data?.length > 0 ? (
          <PatientTable patients={patients.data} />
        ) : (
          <NotAvailable title={"Patients"} />
        )}
      </div>
    </ChildrenWrapper>
  );
}


export function generateMetadata() {
  return {
    title: "Patients",
    description: "Manage and view patient details",
  };
}