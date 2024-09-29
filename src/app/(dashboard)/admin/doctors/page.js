"use client";

import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { AdminDoctorsSelector } from "@/store/AdminAtom";
import ReusableTable from "@/components/ReusableTable";
import Inputs from "@/lib/inputs";
import { CardContent, Card } from "@/components/ui/card";
import AddDoctor from "@/components/AddDoctor";
import { useAPI } from "@/hooks/useAPI";

// Configuration for the form inputs
const formInput = Inputs.AddDoctorInput;

export default function Doctors() {
  const doctorsLoadable = useRecoilValueLoadable(AdminDoctorsSelector);
  const [doctors, setDoctors] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const api = useAPI();

  useEffect(() => {
    if (doctorsLoadable.state === "hasValue") {
      setDoctors(doctorsLoadable.contents.data || []);
      setIsLoading(false);
    }
    if (doctorsLoadable.state === "loading") {
      setIsLoading(true);
    }
  }, [doctorsLoadable]);
  const handleDeleteDoctor = (id) => async () => {
    try {
      await api.deleteDoctor(id);
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.id !== id)
      );
    } catch (error) {
      console.error("Error deleting doctor:", error);
      // You might want to show a notification or a message to the user
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Specialty", accessor: "specialty" },
    { header: "Contact", accessor: "phone" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h1 className="text-3xl font-bold text-primary">Doctors</h1>
          <AddDoctor setDoctors={setDoctors} />
        </div>
        <Card>
          {loading ? (
            <div className="flex items-center justify-center h-32 text-lg text-gray-500">
              <h1 className="text-2xl font-semibold">Loading...</h1>
            </div>
          ) : doctors.length > 0 ? (
            <CardContent>
              <ReusableTable
                data={doctors}
                columns={columns}
                doctors={doctors}
                handleDelete={handleDeleteDoctor}
              />
            </CardContent>
          ) : (
            <div className="flex items-center justify-center h-32 text-lg text-gray-500">
              <h1 className="text-2xl font-semibold text-gray-500">
                No Doctor available
              </h1>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
