// import {
//   atom,
//   atomFamily,
//   selector,
//   selectorFamily,
//   useRecoilValue,
//   useSetRecoilState,
// } from "recoil";
// import axios from "axios";
// import { hospitalIdState, userRoleState } from "@/store/AdminAtom";
// import { useEffect } from "react";

// // Atom family for storing the details of a single hospital
// export const patientsDetailsState = atom({
//   key: "patientsDetailsState",
//   default: null,
// });

// const patientsDetailsSelector = selector({
//   key: "patientsDetailsSelector",
//   get: async ({ get }) => {
//     const userRole = get(userRoleState);
//     const id = get(hospitalIdState);

//     if (userRole !== "USER") {
//       // return {
//       //   error: "Access denied: You must be a user to view this information.",
//       // };
//       return;
//     }

//     try {
//       const response = await axios.get(`/api/hospital/${id}/patients`);
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         throw new Error("Failed to fetch patient data");
//       }
//     } catch (error) {
//       console.error(`Error fetching patient data: ${error.message}`);
//       return { error: error.message || "An unexpected error occurred" };
//     }
//   },
// });

// const usersDetailsSelector = selector({
//   key: "usersDetailsSelector",
//   get: async ({ get }) => {
//     const userRole = get(userRoleState);
//     const id = get(hospitalIdState);

//     if (userRole !== "ADMIN") {
//       return {
//         error: "Access denied: You must be an admin to view this information.",
//       };
//     }

//     try {
//       const response = await axios.get(`/api/hospital/${id}/users`);
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         throw new Error("Failed to fetch hospital data");
//       }
//     } catch (error) {
//       console.error(`Error fetching hospital data: ${error.message}`);
//       return { error: error.message || "An unexpected error occurred" };
//     }
//   },
// });

// export { patientsDetailsSelector, usersDetailsSelector };

import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import axios from "axios";
import { hospitalIdState, userRoleState } from "@/store/AdminAtom";
import { useEffect } from "react";

// Utility to load and save data from localStorage
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

// Atom family for storing the details of a single hospital
export const patientsDetailsState = atom({
  key: "patientsDetailsState",
  default: null,
  effects_UNSTABLE: [localStorageEffect("patientsDetailsState")], // Add persistence effect
});

const patientsDetailsSelector = selector({
  key: "patientsDetailsSelector",
  get: async ({ get }) => {
    const userRole = get(userRoleState);
    const id = get(hospitalIdState);

    if (userRole !== "USER") {
      return;
    }

    try {
      const response = await axios.get(`/api/hospital/${id}/patients`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch patient data");
      }
    } catch (error) {
      console.error(`Error fetching patient data: ${error.message}`);
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

export { patientsDetailsSelector, usersDetailsSelector };

