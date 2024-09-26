import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import Model from "./Model";

export default function DoctorTable({ doctors = [] }) {
  const handleDelete = (id) => {
    // Perform delete operation
    console.log(`Deleting doctor with id: ${id}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full">
        <TableCaption className="text-lg font-semibold mb-4">
          A list of all doctors in your hospital
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-primary/5">
            <TableHead className="w-[200px] font-bold">Name</TableHead>
            <TableHead className="w-[200px] font-bold">Specialty</TableHead>
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
              <TableCell className="font-medium">{doctor.name}</TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell>{doctor.contact}</TableCell>
              <TableCell className="text-center">
                <Model onClick={() => handleDelete(doctor.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
