"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function AddPatient() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    assignedDoctor: "",
  });
  const { data: session } = useSession();
  const hospitalId = session?.user?.hospitalId;

  useEffect(() => {
    const fetchDoctors = async () => {
      if (hospitalId) {
        try {
          const response = await axios.get(
            `/api/doctor?hospitalId=${hospitalId}`
          );
          setDoctors(response.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      }
    };
    fetchDoctors();
  }, [hospitalId]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/patient", {
        ...form,
        hospitalId,
      });
      console.log("Patient added:", response.data);
      toast.success("Patient added successfully");
      // Clear form after submission
      setForm({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        assignedDoctor: "",
      });
    } catch (error) {
      toast.error("Failed to add patient");
      console.error("Error adding patient:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Add Patient</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new patient.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter patient name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Enter patient email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={handleInputChange}
              placeholder="Enter patient phone number"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              value={form.age}
              onChange={handleInputChange}
              placeholder="Enter patient age"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              value={form.gender}
              onValueChange={(value) => setForm({ ...form, gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="male" value="Male">
                  Male
                </SelectItem>
                <SelectItem key="female" value="Female">
                  Female
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="assignedDoctor">Assign Doctor</Label>
            <Select
              id="assignedDoctor"
              value={form.assignedDoctor}
              onValueChange={(value) =>
                setForm({ ...form, assignedDoctor: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <div>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
            <Button type="submit">Save Patient</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
