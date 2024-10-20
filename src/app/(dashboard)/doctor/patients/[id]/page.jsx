import { MedicationManager } from "@/components/user/MedicationManager";
import { ThresholdManager } from "@/components/user/ThresholdManager";
import { DiagnoseManager } from "@/components/user/DiagnoseManager";
import { PatientInformation } from "@/components/user/PatientInformation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { fetchPatientById } from "@/server/actions/patients/fetch-patients";
import NotAvailable from "@/components/other/NotAvailable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DoctorDiagnosisPage({ params }) {
  const { user } = await getServerSession(authOptions);
  const userId = user.id;
  const id = params.id;
  const { data: patient, error } = await fetchPatientById({
    patientId: id,
    userId,
  });


  if (!patient)
    return (
      <div className="flex justify-center items-center h-screen">
        <NotAvailable
          title="Patient"
          description={error || "Patient not found"}
        />
      </div>
    );

  return (
    <ChildrenWrapper
      title={`Diagnose ${patient.firstName} ${patient.lastName}`}
      description="Diagnose the patient, manage their medication and thresholds, then save the changes."
    >
      <div className="space-y-6 ">
        <Tabs defaultValue="patientInformation" className="w-full h-fit">
          <TabsList className="grid w-full grid-cols-4 gap-4 p-1 rounded-lg">
            <TabsTrigger
              value="patientInformation"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              General Information
            </TabsTrigger>
            <TabsTrigger
              value="diagnose"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Diagnose
            </TabsTrigger>
            <TabsTrigger
              value="medication"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Medication
            </TabsTrigger>
            <TabsTrigger
              value="thresholds"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Threshold
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <ScrollArea className="h-[calc(100vh-30vh)] pr-4">
              <TabsContent value="patientInformation">
                <div>
                  <PatientInformation patient={patient} />
                </div>
              </TabsContent>
              <TabsContent value="diagnose">
                <div>
                  <DiagnoseManager patient={patient} />
                </div>
              </TabsContent>
              <TabsContent value="medication">
                <MedicationManager patient={patient} />
              </TabsContent>
              <TabsContent value="thresholds">
                <ThresholdManager patient={patient} />
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </div>
    </ChildrenWrapper>
  );
}
