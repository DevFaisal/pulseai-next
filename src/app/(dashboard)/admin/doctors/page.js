"use client";

import { z } from "zod";
import ReusableForm from "@/components/ReusableForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import DoctorTable from "@/components/DoctorTable";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import Loading from "@/components/Loading"; // Custom loading component with progress bar

// Schema validation for the form inputs
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  specialty: z
    .string()
    .min(2, { message: "Specialty must be at least 2 characters." }),
  contact: z
    .string()
    .length(10, { message: "Contact number must be exactly 10 digits." })
    .regex(/^\d+$/, { message: "Contact number must contain only digits." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Configuration for the form inputs
const formInputs = {
  name: { label: "Name", type: "text", placeholder: "John Doe" },
  specialty: { label: "Specialty", type: "text", placeholder: "Cardiologist" },
  contact: { label: "Contact", type: "text", placeholder: "1234567890" },
  email: { label: "Email", type: "email", placeholder: "abc@example.com" },
  password: { label: "Password", type: "password", placeholder: "********" },
};

export default function Doctors() {
  const { data: session, status } = useSession();
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0); // Track loading progress
  const user = session?.user;

  // Fetch doctors and track progress dynamically
  useEffect(() => {
    const fetchDoctors = async () => {
      if (user?.hospitalId) {
        setLoading(true);
        setProgress(20); // Start progress at 20%

        try {
          const response = await axios.get(
            `/api/user/${user.hospitalId}/DOCTOR`
          );

          setProgress(50);

          await new Promise((resolve) => setTimeout(resolve, 2000));

          setDoctorList(response.data);
          setProgress(100);
        } catch (error) {
          setError("Error fetching doctor list. Please try again later.");
          setProgress(100);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctors();
  }, [user?.hospitalId]);

  const handleSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to add a doctor.");
      return;
    }

    setFormLoading(true);
    try {
      const response = await axios.post("/api/user", {
        ...data,
        role: "DOCTOR",
        hospitalId: user.hospitalId,
      });

      if (response.status === 201) {
        toast.success("Doctor added successfully.");
        setDoctorList((prev) => [...prev, response.data]);

        setError(null);
      } else {
        setError("Failed to add doctor. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding doctor.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  const renderedDoctors = useMemo(() => {
    if (loading) {
      return <Loading progress={progress} />;
    }
    return <DoctorTable doctors={doctorList} />;
  }, [loading, doctorList, progress]);

  if (status === "loading") {
    return <Loading progress={progress} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Doctor Registration</h1>

      {error && toast.error(error)}
      <div className="flex flex-col gap-3 p-4">
        <ReusableForm
          schema={formSchema}
          inputs={formInputs}
          onSubmit={handleSubmit}
          isLoading={formLoading}
        />
        <div>{renderedDoctors}</div>
      </div>
    </div>
  );
}
