import { atom, selector } from "recoil";
import axios from "axios";

// Atom to store hospital ID
export const hospitalIdState = atom({
  key: "hospitalIdState",
  default: "",
});

export const AdminPatientsSelector = selector({
  key: "AdminPatientsSelector",
  get: async ({ get }) => {
    const hospitalId = get(hospitalIdState);

    if (!hospitalId) {
      return { error: "No hospital ID available" };
    }

    try {
      const { data } = await axios.get(`/api/patient?hospitalId=${hospitalId}`);
      return data;
    } catch (error) {
      // Handle any errors from the API request
      return { error: error.message };
    }
  },
});

export const AdminDoctorsSelector = selector({
  key: "AdminDoctorsSelector",
  get: async ({ get }) => {
    const hospitalId = get(hospitalIdState);

    if (!hospitalId) {
      return { error: "No hospital ID available" };
    }

    try {
      const { data } = await axios.get(`/api/doctor?hospitalId=${hospitalId}`);
      return data;
    } catch (error) {
      return { error: error.message };
    }
  },
});
