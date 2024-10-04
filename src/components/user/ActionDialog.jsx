"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientInformation } from "./PatientInformation";
import { MedicationManager } from "@/components/user/MedicationManager";
import { ThresholdManager } from "@/components/user/ThresholdManager";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DiagnoseManager } from "./DiagnoseManager";

export default function ActionDialog({
  selectedPatient,
  setSelectedPatient,
  onDiagnoseSubmit,
}) {
  const [activeTab, setActiveTab] = React.useState("information");

  return (
    <Dialog
      open={!!selectedPatient}
      onOpenChange={() => setSelectedPatient(null)}
    >
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            Diagnose {selectedPatient?.name || "Patient"}
          </DialogTitle>
          <DialogDescription>
            Diagnose the patient, manage their medication and thresholds, then
            save the changes.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="diagnose">Diagnose</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-fit w-full ">
            <TabsContent value="information">
              {selectedPatient && (
                <PatientInformation patient={selectedPatient} />
              )}
            </TabsContent>
            <TabsContent value="diagnose">
              <DiagnoseManager
                patient={selectedPatient}
                onDiagnoseSubmit={onDiagnoseSubmit}
              />
            </TabsContent>
            <TabsContent value="medication">
              <MedicationManager patient={selectedPatient} />
            </TabsContent>
            <TabsContent value="thresholds">
              <ThresholdManager
                patient={selectedPatient}
                // thresholds={thresholds}
                // setThresholds={setThresholds}
                // newThreshold={newThreshold}
                // setNewThreshold={setNewThreshold}
                // handleAddThreshold={handleAddThreshold}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
        {/* <DialogFooter>
          <Button variant="outline" onClick={() => setSelectedPatient(null)}>
            Cancel
          </Button>
          <Button onClick={handleFinalSave}>Save Changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
