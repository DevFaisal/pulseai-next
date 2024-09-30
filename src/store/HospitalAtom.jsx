import { atomFamily, selector, selectorFamily, useRecoilValue } from "recoil";
import axios from "axios";
import { hospitalIdState, userRoleState } from "@/store/AdminAtom";

const patientsDetailsSelector = selector({
  key: "patientsDetailsSelector",
  get: async ({ get }) => {
    const userRole = get(userRoleState);
    const id = get(hospitalIdState);

    if (userRole !== "USER") {
      return {
        error: "Access denied: You must be a user to view this information.",
      };
    }

    try {
      console.log("Fetching patients details...");

      const response = await axios.get(`/api/hospital/${id}/patients`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error(`Error fetching doctor data: ${error.message}`);
      return { error: error.message || "An unexpected error occurred" };
    }
  },
});

const usersDetailsSelector = selector({
  key: "usersDetailsSelector",
  get: async ({ get }) => {
    const userRole = get(userRoleState);
    const id = get(hospitalIdState);

    if (userRole !== "ADMIN") {
      return {
        error: "Access denied: You must be an admin to view this information.",
      };
    }

    try {
      const response = await axios.get(`/api/hospital/${id}/users`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch hospital data");
      }
    } catch (error) {
      console.error(`Error fetching hospital data: ${error.message}`);
      return { error: error.message || "An unexpected error occurred" };
    }
  },
});

// Exporting the atom family and selector family for usage in components
export { patientsDetailsSelector, usersDetailsSelector };
