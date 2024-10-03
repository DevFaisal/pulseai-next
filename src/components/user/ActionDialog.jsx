"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientInformation } from "./PatientInformation";
import { MedicationManager } from "@/components/user/MedicationManager";
import { ThresholdManager } from "@/components/user/ThresholdManager";

export default function ActionDialog({
  selectedPatient,
  setSelectedPatient,
  newMedication,
  setNewMedication,
  handleAddMedication,
  thresholds,
  newThreshold,
  setNewThreshold,
  handleAddThreshold,
}) {
  return (
    <Dialog
      open={!!selectedPatient}
      onOpenChange={() => setSelectedPatient(null)}
    >
      <DialogContent className="sm:max-w-[700px] p-0">
        <Tabs defaultValue="information" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          </TabsList>
          <div className="p-6">
            <TabsContent value="information">
              <PatientInformation patient={selectedPatient} />
            </TabsContent>
            <TabsContent value="medication">
              <MedicationManager
                patient={selectedPatient}
                newMedication={newMedication}
                setNewMedication={setNewMedication}
                handleAddMedication={handleAddMedication}
              />
            </TabsContent>
            <TabsContent value="thresholds">
              <ThresholdManager
                thresholds={thresholds}
                newThreshold={newThreshold}
                setNewThreshold={setNewThreshold}
                handleAddThreshold={handleAddThreshold}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
