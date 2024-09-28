"use client";
import { doctorDetailsSelector } from "@/store/DoctorAtom";
import { useSession } from "next-auth/react";
import { useRecoilValueLoadable } from "recoil";

export default function Doctors() {
  const { data: session } = useSession();
  const doctorId = session?.user.id;
  const doctorDetails = useRecoilValueLoadable(doctorDetailsSelector(doctorId));
  console.log(doctorDetails);
  return (
    <div>
      <h1>Doctors</h1>
    </div>
  );
}
