import PatientList from "@/components/user/PatientList";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
// import { DiagnosePatient } from "@/server/actions/patients/diagnose-patient";
import { toast } from "sonner";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { fetchDoctorsPatients } from "@/server/actions/doctors/fetch-doctors";
import NotAvailable from "@/components/other/NotAvailable";

export default async function DoctorDashboard() {
  const { user } = await getServerSession(NEXT_AUTH);
  const userId = user.id;
  const { data: data } = await fetchDoctorsPatients({ userId });

  // const handleFinalSave = async () => {
  //   try {
  //     const res = await DiagnosePatient({
  //       patientId: selectedPatient.id,
  //       diagnose,
  //       newMedication,
  //       thresholds,
  //     });
  //     if (res.error) {
  //       console.error("Failed to save changes", res.error);
  //       toast.error("Failed to save changes");
  //       return;
  //     }
  //     toast.success("Changes saved successfully");
  //     console.log(res);
  //   } catch (error) {
  //     console.error("Failed to save changes", error);
  //     toast.error("Failed to save changes");
  //   }
  // };

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
