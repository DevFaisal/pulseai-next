import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const AUTH_ENDPOINT = "/_svc/pulseaicore/auth/login";
const VITALS_ENDPOINT = "/_svc/pulseaicore/vision/vitals";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

async function getAuthToken() {
  try {
    const response = await api.post(AUTH_ENDPOINT, {
      username: process.env.NEXT_PUBLIC_API_USERNAME,
      password: process.env.NEXT_PUBLIC_API_PASSWORD,
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching auth token:", error);
    throw new Error("Failed to authenticate");
  }
}

async function fetchVitals({ type, firebaseId, token }) {
  try {
    const response = await api.get(VITALS_ENDPOINT, {
      params: {
        vital_name: type,
        firebase_id: firebaseId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching vitals:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

export { fetchVitals, getAuthToken };