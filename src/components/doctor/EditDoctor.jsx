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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAPI } from "@/hooks/useAPI";

const patientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  age: z
    .number()
    .min(0, "Age must be a positive number")
    .max(120, "Age is not valid"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  assignedDoctor: z.string().nonempty("Doctor selection is required"),
});

export function EditDoctor({ patient, doctors }) {
  const api = useAPI();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(patientSchema),
    defaultValues: {
      name: patient.name,
      age: String(patient.age),
      gender: patient.gender,
      assignedDoctor: patient.assignedDoctorId,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.updatePatient(data, patient.id);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogDescription>
            Update the patient's information.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" {...register("age")} />
            {errors.age && (
              <span className="text-red-500">{errors.age.message}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              defaultValue={patient.gender}
              {...register("gender")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <span className="text-xs text-red-500">
                {errors.gender.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="assignedDoctor">Assigned Doctor</Label>
            <Select
              id="assignedDoctor"
              defaultValue={patient.assignedDoctorId}
              {...register("assignedDoctor")}
            >
              <SelectTrigger>
                <SelectValue>
                  {patient.assignedDoctorId && Array.isArray(doctors)
                    ? doctors.find((doc) => doc.id === patient.assignedDoctorId)
                        ?.name
                    : "Select doctor"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(doctors) && doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No doctors available</SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.assignedDoctor && (
              <span className="text-xs text-red-500">
                {errors.assignedDoctor.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}
