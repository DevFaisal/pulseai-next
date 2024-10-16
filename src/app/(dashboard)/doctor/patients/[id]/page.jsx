import { MedicationManager } from "@/components/user/MedicationManager";
import { ThresholdManager } from "@/components/user/ThresholdManager";
import { DiagnoseManager } from "@/components/user/DiagnoseManager";
import { PatientInformation } from "@/components/user/PatientInformation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import { fetchPatientById } from "@/server/actions/patients/fetch-patients";
import NotAvailable from "@/components/other/NotAvailable";

export default async function DoctorDiagnosisPage({ params }) {
  const id = params.id;
  const patient = (await fetchPatientById({ patientId: id })).data;

  if (!patient)
    return (
      <div className="flex justify-center items-center h-screen">
        <NotAvailable
          title="Patient"
          description="The patient you are looking for does not exist."
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
          <TabsList className="grid w-full grid-cols-4 gap-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="patientInformation"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              General Information
            </TabsTrigger>
            <TabsTrigger
              value="diagnose"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Diagnose
            </TabsTrigger>
            <TabsTrigger
              value="medication"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Medication
            </TabsTrigger>
            <TabsTrigger
              value="thresholds"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Threshold
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <TabsContent value="patientInformation">
                <PatientInformation patient={patient} />
              </TabsContent>
              <TabsContent value="diagnose">
                <DiagnoseManager patient={patient} />
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
