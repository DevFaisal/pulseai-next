import { atom, selector } from "recoil";
import axios from "axios";

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

// Utility function to handle API requests with error handling
const fetchData = async (url, hospitalId) => {
  try {
    const response = await axios.get(url, { params: { hospitalId } });

    // Check if response status is OK
    if (response.status === 200) {
      return { data: response.data, error: false };
    }
    return { error: true, message: `Error: Failed to fetch data from ${url}` };
  } catch (error) {
    console.error(`API Error [${url}]:`, error.message);
    return { error: true, message: error.response?.data?.message || error.message };
  }
};

// Authorization and hospital ID check
const checkAuthorization = (userRole, hospitalId) => {
  if (userRole !== "ADMIN") {
    return { error: true, message: "You are not authorized to view this page" };
  }
  if (!hospitalId) {
    return { error: true, message: "Hospital ID is missing" };
  }
  return { error: false };
};

// Selector to fetch hospital patients
export const AdminPatientsSelector = selector({
  key: "AdminPatientsSelector",
  get: async ({ get }) => {
    const hospitalId = get(hospitalIdState);
    const userRole = get(userRoleState);

    const authCheck = checkAuthorization(userRole, hospitalId);
    if (authCheck.error) return authCheck;

    const url = `/api/patient`;
    return await fetchData(url, hospitalId);
  },
});

// Selector to fetch hospital doctors
export const AdminDoctorsSelector = selector({
  key: "AdminDoctorsSelector",
  get: async ({ get }) => {
    const hospitalId = get(hospitalIdState);
    const userRole = get(userRoleState);

    const authCheck = checkAuthorization(userRole, hospitalId);
    if (authCheck.error) return authCheck;

    const url = `/api/doctor`;
    return await fetchData(url, hospitalId);
  },
});
