import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
import Button from "@/components/ui/button";

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
                {/* <Model onClick={() => handleDelete(doctor.id)} /> */}
                {/* <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Patient</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this patient?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}