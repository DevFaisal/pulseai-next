import axios from "axios";

export const fetchVitals = async ({
  type = "blood_pressure",
  firebaseId = "my_id_1001",
}) => {
  const API_URL = "http://3.29.224.51/_svc/pulseaicore/vision/vitals";
  const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXN0ZXJfYWRtaW4iLCJleHAiOjE3MjkwOTQzNDd9.3RyHLwBdTm2d9f-RMaLSNZKG6_WKiJ5ceFFXHUGHKeU";

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_URL}?vital_name=${type}&firebase_id=${firebaseId}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching vitals:",
      error.response?.data || error.message
    );
    throw error;
  }
};
