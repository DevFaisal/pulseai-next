import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChildrenWrapper from "@/components/other/ChildrenWrapper";
import AddSinglePatient from "@/components/patient/AddSinglePatient";

export default function AddPatient() {
  return (
    <ChildrenWrapper>
      <Tabs defaultValue="add-patient" className="w-full">
        <TabsList>
          <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
          <TabsTrigger value="add-patient-bulk">Bulk Add</TabsTrigger>
        </TabsList>
        <TabsContent value="add-patient">
          {/* Add Single Patient */}
          <AddSinglePatient />
        </TabsContent>
        <TabsContent value="add-patient-bulk">
          <div>
            {/* Implement bulk add functionality here */}
            <h1>Bulk Add Patients</h1>
          </div>
        </TabsContent>
      </Tabs>
    </ChildrenWrapper>
  );
}
