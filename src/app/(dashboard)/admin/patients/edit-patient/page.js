import PatientTable from "@/components/patient/PatientTable";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import AddPatientButton from "@/components/other/AddPatientButton";
import NotAvailable from "@/components/other/NotAvailable";
import EditPatient from "@/components/patient/EditPatient";
import { fetchPatientById } from "@/server/actions/patients/fetch-patients";

export default async function EditPatientPage({ searchParams }) {
  const { id } = searchParams;
  const patient = await fetchPatientById({ patientId: id });

  return (
    <ChildrenWrapper
      title={"Edit Patient"}
      description={"Manage and view patient details"}
      LeftComponent={null}
    >
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
