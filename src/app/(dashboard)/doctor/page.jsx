"use client";
import { doctorDetailsSelector } from "@/store/DoctorAtom";
import { useSession } from "next-auth/react";
import { useRecoilValueLoadable } from "recoil";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReusableTable from "@/components/ReusableTable";
import DeleteDialog from "@/components/DeleteDialog"; // Make sure you have this component
import { useCallback } from "react";

export default function Doctors() {
  const { data: session } = useSession();
  const doctorId = session?.user.id;
  const doctorDetails = useRecoilValueLoadable(doctorDetailsSelector(doctorId));
  const [patients, setPatients] = useState([]);

  // Define the columns for the ReusableTable
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Gender", accessor: "gender" },
  ];

  useEffect(() => {
    if (doctorDetails.state === "hasValue") {
      setPatients(doctorDetails.contents.patients || []);
    }
  }, [doctorDetails]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background p-4 md:p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">My Patients</h1>
      <Card className="shadow-lg">
        {patients.length > 0 ? (
          <CardContent>
            <ReusableTable
              data={patients}
              columns={columns}
              setPatients={setPatients}
              handleDelete={() => {}}
            />
          </CardContent>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <h2 className="text-2xl font-semibold text-center text-gray-500">
              No patients available
            </h2>
          </div>
        )}
      </Card>
    </div>
  );
}
