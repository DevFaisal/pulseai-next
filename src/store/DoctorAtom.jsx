import { atomFamily, selectorFamily, useRecoilValue } from "recoil";
import axios from "axios";
import { userRoleState } from "@/store/AdminAtom";

// Atom family for storing doctor data
const doctorDataState = atomFamily({
  key: "doctorDataState",
  default: null,
});

// Selector family for fetching doctor details by ID
const doctorDetailsSelector = selectorFamily({
  key: "doctorDetailsSelector",
  get:
    (id) =>
    async ({ get }) => {
      const userRole = get(userRoleState); // Get the current user role

      // Ensure that only the DOCTOR role can access this selector
      if (userRole !== "DOCTOR") {
        return {
          error:
            "Access denied: You must be a doctor to view this information.",
        };
      }

      try {
        console.log("Fetching doctor details...");
        const response = await axios.get(`/api/doctor/${id}`); // Fetch doctor details
        if (response.status === 200) {
          return response.data; // Return the doctor data if the request is successful
        } else {
          throw new Error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error(`Error fetching doctor data: ${error.message}`);
        return { error: error.message || "An unexpected error occurred" };
      }
    },
});

// Exporting the atom family and selector family for usage in components
export { doctorDataState, doctorDetailsSelector };
