// import { atom, selector, selectorFamily } from "recoil";
// import axios from "axios";
// import { hospitalIdState, userRoleState } from "@/store/AdminAtom";
// import { getSession } from "next-auth/react";
// import { fetchUsers } from "@/server/actions/users/fetch-users";
// import { fetchPatientById } from "@/server/actions/patients/fetch-patients";
// import { fetchDetailsForAdmin } from "@/server/actions/doctors/fetch-doctors";

// // Atom for storing the details of a single patient
// export const patientsDetailsState = atom({
//   key: "patientsDetailsState",
//   default: [],
// });

// // Selector for fetching all patients of a hospital
// export const patientsDetailsSelector = selector({
//   key: "patientsDetailsSelector",
//   get: async ({ get }) => {
//     const { user } = await getSession();
//     const id = user.hospitalId;

//     try {
//       const response = await axios.get(`/api/hospital/${id}/patients`);
//       if (response.status === 200) {
//         return response.data; // Return the patient data
//       }
//       throw new Error("Failed to fetch patients data");
//     } catch (error) {
//       console.error(`Error fetching patients data: ${error.message}`);
//       return { error: error.message || "An unexpected error occurred" };
//     }
//   },
// });

// // Selector for fetching a specific patient’s details
// export const patientDetailsId = selectorFamily({
//   key: "patientDetailsId",
//   get:
//     (patientId) =>
//     async ({ get }) => {
//       try {
//         const res = await fetchPatientById({ patientId });
//         if (res.data) {
//           return res.data;
//         }
//         throw new Error("Failed to fetch patient data");
//       } catch (error) {
//         console.error(`Error fetching patient data: ${error.message}`);
//         return { error: error.message || "An unexpected error occurred" }; // Always return an error
//       }
//     },
// });

// export const adminDashboardDetailsSelector = selector({
//   key: "adminDashboardDetailsSelector",
//   get: async ({ get }) => {
//     const hospitalId = get(hospitalIdState);
//     try {
//       return (await fetchDetailsForAdmin({ hospitalId })).data;
//     } catch (error) {
//       console.error(`Error fetching admin details: ${error.message}`);
//       return { error: error.message || "An unexpected error occurred" };
//     }
//   },
// });

// // Selector for fetching all users of a hospital
// export const usersDetailsSelector = selector({
//   key: "usersDetailsSelector",
//   get: async ({ get }) => {
//     const { user } = await getSession();
//     const id = user.hospitalId;
//     try {
//       return (await fetchUsers({ hospitalId: id })).data;
//     } catch (error) {
//       console.error(`Error fetching users data: ${error.message}`);
//       return { error: error.message || "An unexpected error occurred" };
//     }
//   },
// });
