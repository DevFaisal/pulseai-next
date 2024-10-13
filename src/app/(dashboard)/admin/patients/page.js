import PatientTable from "@/components/patient/PatientTable";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { Button } from "@/components/ui/button";
import AddPatientButton from "@/components/other/AddPatientButton";

export default function Patients() {
  return (
    <ChildrenWrapper
      title={"Patients"}
      description={"Manage and view patient details"}
      LeftComponent={() => <AddPatientButton />}
    >
      <div>
        <PatientTable />
      </div>
    </ChildrenWrapper>
  );
}
