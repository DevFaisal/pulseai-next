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
import { doctorSchema } from "@/lib/inputValidation";
import { toast } from "sonner";

export default function AddDoctor({ setDoctors }) {
  const hospitalId = useRecoilValue(hospitalIdState);
  const api = useAPI();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (formData) => {
    formData.name = "Dr. " + formData.name;
    try {
      const newDoctor = await api.addDoctor(formData, hospitalId);
      setDoctors((prev) => [...prev, newDoctor]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("Error adding patient");
    }
  };

  // Form fields definition with select inputs
  const inputs = Inputs.AddDoctorInput;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Doctor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new Doctor.
          </DialogDescription>
        </DialogHeader>
        {/* Using ReusableFormWithSelect */}
        <ReusableFormWithSelect
          schema={doctorSchema}
          inputs={inputs}
          onSubmit={handleSubmit}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
