import { atomFamily, selectorFamily, useRecoilValue } from "recoil";
import axios from "axios";
import { userRoleState } from "@/store/AdminAtom";

const patientsDetailsSelector = selectorFamily({
  key: "patientsDetailsSelector",
  get:
    (id) =>
    async ({ get }) => {
      const userRole = get(userRoleState);

      if (userRole !== "USER") {
        return {
          error: "Access denied: You must be a user to view this information.",
        };
      }

      try {
        console.log("Fetching doctor details...");

        const response = await axios.get(`/api/hospital/${id}`);
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

// Exporting the atom family and selector family for usage in components
export { patientsDetailsSelector };
