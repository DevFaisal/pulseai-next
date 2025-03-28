"use client";
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
import { doctorSchema } from "@/lib/inputValidation";
import { toast } from "sonner";
import { createDoctor } from "@/server/actions/doctors/create-doctor";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddDoctor() {
  const session = useSession();
  const hospitalId = session?.data?.user?.hospitalId;
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const newDoctor = await createDoctor({ formData, hospitalId });
      if (newDoctor.error) {
        toast.error(newDoctor.error);
        return;
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("Error adding doctor. Please try again later.");
    } finally {
      setDialogOpen(false);
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

        <ReusableFormWithSelect
          schema={doctorSchema}
          inputs={inputs}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
