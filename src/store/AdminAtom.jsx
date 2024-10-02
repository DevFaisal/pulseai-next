import { atom, selector } from "recoil";
import axios from "axios";
import { getSession } from "next-auth/react";
import { fetchDoctors } from "@/server/actions/fetch-doctors";
import { fetchPatients } from "@/server/actions/fetch-patients";

// Atom to store hospital ID
export const hospitalIdState = atom({
  key: "hospitalIdState",
  default: "",
});

// Atom to store user role
export const userRoleState = atom({
  key: "userRoleState",
  default: "",
});

// Selector to fetch hospital patients
export const AdminPatientsSelector = selector({
  key: "AdminPatientsSelector",
  get: async ({ get }) => {
    const { user } = await getSession();
    const hospitalId = user.hospitalId;

    return await fetchPatients({ hospitalId });
  },
});

// Selector to fetch hospital doctors
export const AdminDoctorsSelector = selector({
  key: "AdminDoctorsSelector",
  get: async ({ get }) => {
    const hospitalId = get(hospitalIdState);

    return await fetchDoctors({ hospitalId });
  },
});
