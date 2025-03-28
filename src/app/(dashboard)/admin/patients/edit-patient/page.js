import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import EditPatient from "./components/EditPatient";
import { fetchPatientById } from "@/server/actions/patients/fetch-patients";

export default async function EditPatientPage({ searchParams }) {
  const { id } = searchParams;
  const patient = await fetchPatientById({ patientId: id });

  return (
    <ChildrenWrapper title={"Edit Patient"} description={"Manage and view patient details"} LeftComponent={null}>
      <div>
        <EditPatient patient={patient.data} />
      </div>
    </ChildrenWrapper>
  );
}

export function generateMetadata() {
  return {
    title: "Edit Patients",
    description: "Manage and edit patient details",
  };
}
