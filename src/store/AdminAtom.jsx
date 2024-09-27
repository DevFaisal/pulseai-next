import { atom, selector } from "recoil";
import axios from "axios";

// Atom to store hospital ID
export const hospitalIdState = atom({
  key: "hospitalIdState",
  default: "", 
});

// Selector for fetching patients based on hospital ID
export const AdminPatientsSelector = selector({
  key: "AdminPatientsSelector",
  get: async ({ get }) => {
    const hospitalId = get(hospitalIdState);

    if (!hospitalId) return { error: "No hospital ID" };

    try {
      const { data } = await axios(`/api/patient?hospitalId=${hospitalId}`);
      return data;
    } catch (error) {
      return { error: error.message };
    }
  },
});

// Selector for fetching doctors based on hospital ID
export const AdminDoctorsSelector = selector({
  key: "AdminDoctorsSelector",
  get: async ({ get }) => {
    const hospitalId = get(hospitalIdState);

    if (!hospitalId) return { error: "No hospital ID" };

    try {
      const { data } = await axios(`/api/doctor?hospitalId=${hospitalId}`);
      return data;
    } catch (error) {
      return { error: error.message };
    }
  },
});
