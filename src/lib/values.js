import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const { user } = await getServerSession(authOptions);

export const hospitalName = user.hospitalName;






export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};