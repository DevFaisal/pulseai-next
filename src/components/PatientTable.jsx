import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

export default function PatientTable({ patients = [], setPatients }) {
  const deletePatient = (id) => async () => {
    try {
      const res = await axios.delete(`/api/patient/${id}`);
      if (res.status === 200) {
        setPatients((prev) => prev.filter((patient) => patient.id !== id));
        toast.success("Patient deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting patient");
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Assigned Doctor</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{patient.name}</div>
              </TableCell>
              <TableCell>
                <div>{patient.age}</div>
              </TableCell>
              <TableCell>
                <div>{patient.gender}</div>
              </TableCell>
              <TableCell>
                <div>{patient.assignedDoctor}</div>
              </TableCell>
              <TableCell className="text-right">
                {/* Edit Patient Dialog */}
                <Dialog>
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
                    <form className="grid gap-4">
                      {/* Edit Form with default values */}
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={patient.name} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="johndoe@example.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue="+1 (555) 555-5555" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="doctor">Assigned Doctor</Label>
                        <Select id="doctor" defaultValue="dr-jane-smith">
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-jane-smith">
                              Dr. Jane Smith
                            </SelectItem>
                            <SelectItem value="dr-john-smith">
                              Dr. John Smith
                            </SelectItem>
                            <SelectItem value="dr-sarah-lee">
                              Dr. Sarah Lee
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </form>
                    <DialogFooter>
                      <DialogClose>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete Patient Dialog */}
                <Dialog>
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
                      <DialogClose>
                        <Button variant="outline">Cancel</Button>{" "}
                      </DialogClose>
                      <Button
                        onClick={deletePatient(patient.id)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
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

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
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
