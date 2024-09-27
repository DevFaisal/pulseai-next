"use client";
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
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteDialog({ id }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const deletePatient = () => async () => {
    try {
      const res = await axios.delete(`/api/patient/${id}`);
      if (res.status === 200) {
        setPatients((prev) => prev.filter((patient) => patient.id !== id));
        setDialogOpen(false);
        toast.success("Patient deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting patient");
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogClose />
      <DialogDescription>
        Are you sure you want to delete this patient?
      </DialogDescription>
      <DialogFooter>
        <Button>Cancel</Button>
        <Button onClick={deletePatient} variant="danger">
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
