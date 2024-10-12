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
import ReusableFormWithSelect from "@/components/other/ReusableFormWithSelect";
import Inputs from "@/lib/inputs";
import { useRecoilValue } from "recoil";
import { hospitalIdState } from "@/store/AdminAtom";
import { doctorSchema } from "@/lib/inputValidation";
import { toast } from "sonner";
import { createDoctor } from "@/server/actions/doctors/create-doctor";

export default function AddDoctor({ setDoctors }) {
  const hospitalId = useRecoilValue(hospitalIdState);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const newDoctor = await createDoctor({ formData, hospitalId });

      if (newDoctor.error) {
        toast.error(newDoctor.error);
        return;
      }

      setDoctors((prev) => [...prev, newDoctor.data]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("Error adding patient");
    }
  };

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
      </DialogContent>
    </Dialog>
  );
}
