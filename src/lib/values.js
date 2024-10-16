import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

const { user } = await getServerSession(NEXT_AUTH);

export const hospitalName = user.hospitalName;
