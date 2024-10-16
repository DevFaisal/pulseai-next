// import { atom, atomFamily, selectorFamily, useRecoilValue } from "recoil";
// import { fetchDoctorsPatients } from "@/server/actions/doctors/fetch-doctors";

// // Atom family for storing doctor data
// const doctorDataState = atom({
//   key: "doctorDataState",
//   default: [],
// });

// // Selector family for fetching doctor details by ID
// const doctorDetailsSelector = selectorFamily({
//   key: "doctorDetailsSelector",
//   get:
//     (id) =>
//     async ({ get }) => {
//       try {
//         const res = await fetchDoctorsPatients({ userId: id });
//         if (res.error) {
//           throw new Error(res.error);
//         }
//         return res.data;
//       } catch (error) {
//         console.error(`Error fetching doctor data: ${error.message}`);
//         return { error: error.message || "An unexpected error occurred" };
//       }
//     },
// });

// export { doctorDataState, doctorDetailsSelector };
