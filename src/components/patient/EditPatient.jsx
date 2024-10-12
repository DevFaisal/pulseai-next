// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LoadingButton } from "@/components/LoadingButton";
// import { updatePatient } from "@/server/actions/patients/edit-patient";
// import { toast } from "sonner";
// import { EditPatientSchema } from "@/lib/inputValidation";
// import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
// import { useSession } from "next-auth/react";

// export function EditPatient({ patient, setPatients }) {
//   const [loading, setLoading] = useState(false);
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   const [doctors, setDoctors] = useState([]);

//   const { data: sessionData } = useSession();
//   const hospitalId = sessionData?.user?.hospitalId;

//   useEffect(() => {
//     const fetchData = async () => {
//       const doctorsResult = await fetchDoctors({ hospitalId });
//       setDoctors(doctorsResult.data);
//     };
//     fetchData();
//   }, [hospitalId]);

//   console.log("doctors", doctors);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(EditPatientSchema),
//     defaultValues: {
//       name: patient.name,
//       age: String(patient.age),
//       gender: patient.gender,
//       assignedDoctor: patient.assignedDoctorId,
//     },
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const res = await updatePatient({
//         formData: data,
//         patientId: patient.id,
//       });
//       if (res.data) {
//         setPatients((prev) =>
//           prev.map((p) => (p.id === patient.id ? res.data : p))
//         );
//         toast.success("Patient updated successfully");
//         setDialogOpen(false);
//       }
//     } catch (error) {
//       console.error("Error updating patient:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="icon">
//           <FilePenIcon className="h-4 w-4" />
//           <span className="sr-only">Edit</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Patient</DialogTitle>
//           <DialogDescription>
//             Update the patient's information.
//           </DialogDescription>
//         </DialogHeader>
//         <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" {...register("name")} />
//             {errors.name && (
//               <span className="text-xs text-red-500">
//                 {errors.name.message}
//               </span>
//             )}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="age">Age</Label>
//             <Input id="age" type="number" {...register("age")} />
//             {errors.age && (
//               <span className="text-red-500">{errors.age.message}</span>
//             )}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="gender">Gender</Label>
//             <Controller
//               name="gender"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   id="gender"
//                   defaultValue={field.value}
//                   onValueChange={field.onChange}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Gender" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Male">Male</SelectItem>
//                     <SelectItem value="Female">Female</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.gender && (
//               <span className="text-xs text-red-500">
//                 {errors.gender.message}
//               </span>
//             )}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="assignedDoctor">Assigned Doctor</Label>
//             <Controller
//               name="assignedDoctor"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   id="assignedDoctor"
//                   defaultValue={field.id}
//                   onValueChange={field.onChange}
//                 >
//                   <SelectTrigger>
//                     <SelectValue>
//                       {field.value && Array.isArray(doctors)
//                         ? doctors.find((doc) => doc.id === field.id)?.name
//                         : "Select doctor"}
//                     </SelectValue>
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Array.isArray(doctors) && doctors.length > 0 ? (
//                       doctors.map((doctor) => (
//                         <SelectItem key={doctor.id} value={doctor.id}>
//                           {doctor.name}
//                         </SelectItem>
//                       ))
//                     ) : (
//                       <SelectItem disabled>No doctors available</SelectItem>
//                     )}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.assignedDoctor && (
//               <span className="text-xs text-red-500">
//                 {errors.assignedDoctor.message}
//               </span>
//             )}
//           </div>

//           <DialogFooter>
//             <div>
//               <LoadingButton
//                 type="submit"
//                 isLoading={loading}
//                 name="Save Changes"
//                 loadingText="Saving..."
//               />
//             </div>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function FilePenIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
//       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//       <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
//     </svg>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pen } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { updatePatient } from "@/server/actions/patients/edit-patient";
import { fetchDoctors } from "@/server/actions/doctors/fetch-doctors";
import { EditPatientSchema } from "@/lib/inputValidation";
import { doctorDataState } from "@/store/DoctorAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function EditPatient({ patient, setPatients }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const doctors = useRecoilValue(doctorDataState);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditPatientSchema),
    defaultValues: {
      name: patient.name,
      age: String(patient.age),
      gender: patient.gender,
      assignedDoctor: patient.assignedDoctorId,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await updatePatient({
        formData: data,
        patientId: patient.id,
      });
      if (res.data) {
        setPatients((prev) =>
          prev.map((p) => (p.id === patient.id ? res.data : p))
        );
        toast.success("Patient updated successfully");
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("Failed to update patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pen className="h-4 w-4" />
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" {...register("age")} />
            {errors.age && (
              <p className="text-sm text-destructive">{errors.age.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedDoctor">Assigned Doctor</Label>
            <Controller
              name="assignedDoctor"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.length > 0 ? (
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
              )}
            />
            {errors.assignedDoctor && (
              <p className="text-sm text-destructive">
                {errors.assignedDoctor.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
