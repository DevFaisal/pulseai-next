"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReusableFormWithSelect from "@/components/ReusableFormWithSelect";
import { useAPI } from "@/hooks/useAPI";
import Inputs from "@/lib/inputs";
import { useRecoilValue } from "recoil";
import { hospitalIdState } from "@/store/AdminAtom";
import { patientSchema } from "@/lib/inputValidation";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddPatientsInBulk } from "./AddPatientsInBulk";
import { createPatient } from "@/server/actions/patients/create-patient";
import { doctorDataState } from "@/store/DoctorAtom";
import { useSession } from "next-auth/react";

export default function AddPatient({ setPatients }) {
  const { data } = useSession();
  const hospitalId = data.user.hospitalId;
  const doctors = useRecoilValue(doctorDataState);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const newPatient = await createPatient({ formData, hospitalId });
      if (newPatient.error) {
        toast.error(newPatient.error);
        return;
      }
      setPatients((prev) => [...prev, newPatient.data]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("Error adding patient");
    }
  };

  // Form fields definition with select inputs
  const inputs = Inputs.AddPatientInput;
  inputs.assignedDoctor.options =
    doctors?.length >= 0 &&
    doctors?.map((doctor) => ({
      value: doctor.id,
      label: doctor.name,
    }));

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Patient</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new patient.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="patients" className="mt-6">
          <TabsList>
            <TabsTrigger value="add-patient">Patient</TabsTrigger>
            <TabsTrigger value="add-patient-bulk">Bulk</TabsTrigger>
          </TabsList>
          <TabsContent value="add-patient">
            <ReusableFormWithSelect
              schema={patientSchema}
              inputs={inputs}
              onSubmit={handleSubmit}
            />
          </TabsContent>
          <TabsContent value="add-patient-bulk">
            <AddPatientsInBulk />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
