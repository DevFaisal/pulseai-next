
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReusableFormWithSelect from "@/components/ReusableFormWithSelect";
import { useAPI } from "@/hooks/useAPI";
import Inputs from "@/lib/inputs";
import { useRecoilValue } from "recoil";
import { hospitalIdState } from "@/store/AdminAtom";
import { patientSchema } from "@/lib/inputValidation";
import { toast } from "sonner";

export default function AddPatient({ doctors, setPatients }) {
  const hospitalId = useRecoilValue(hospitalIdState);
  const api = useAPI();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const newPatient = await api.addPatient(formData, hospitalId);
      setPatients((prev) => [...prev, newPatient]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("Error adding patient");
    }
  };

  // Form fields definition with select inputs
  const inputs = Inputs.AddPatientInput;
  inputs.assignedDoctor.options =
    doctors.length > 1
      ? doctors?.map((doctor) => ({
          value: doctor.id,
          label: doctor.name,
        }))
      : [{ value: "", label: "No doctors available" }];

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
        {/* Using ReusableFormWithSelect */}
        <ReusableFormWithSelect
          schema={patientSchema}
          inputs={inputs}
          onSubmit={handleSubmit}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}