"use client";

import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteDialog from "@/components/other/DeleteDialog";
import { deleteDoctor } from "@/server/actions/doctors/delete-doctor";
import { Phone } from "lucide-react";

export default function DoctorTable({ doctors = [], setDoctors }) {
  const handleDeleteDoctor = async (userId) => {
    try {
      const result = await deleteDoctor({ userId });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.userId !== userId)
      );

      toast.success("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px] font-bold">Doctor</TableHead>
          <TableHead className="w-[150px] font-bold">Specialty</TableHead>
          <TableHead className="w-[200px] font-bold">Contact</TableHead>
          <TableHead className="w-[100px] font-bold text-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow
            key={doctor.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                <AvatarFallback>
                  {doctor.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg">{doctor.name}</p>
                <p className="text-sm text-gray-500">{doctor.email}</p>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className="font-semibold">
                {doctor.specialty}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{doctor.phone}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <DeleteDialog
                title={`Remove ${doctor.name}`}
                description={`Are you sure you want to remove ${doctor.name} from the directory? This action cannot be undone.`}
                onDelete={() => handleDeleteDoctor(doctor.userId)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
