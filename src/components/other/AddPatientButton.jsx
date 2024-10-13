"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function AddPatientButton() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("patients/add-patient")}>
        Add Patient
      </Button>
    </div>
  );
}
