import axios from "axios";
import { NextResponse } from "next/server";

const AUTH_ENDPOINT = "/auth/login";
const VITALS_ENDPOINT = "/vision/vitals";
const VALID_VITAL_TYPES = ["blood_pressure", "blood_sugar", "temperature", "weight", "heart_rate", "oxygen_saturation"];

// Map API field names to our standardized names
const FIELD_MAPPINGS = {
  blood_sugar: "blood_glucose",
  blood_pressure: "blood_pressure",
  temperature: "temperature",
  weight: "weight",
  heart_rate: "heart_rate",
  oxygen_saturation: "oxygen_saturation",
};

const baseUrl = "http://40.172.4.162";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    // Get authentication token
    const authRes = await api.post(AUTH_ENDPOINT, {
      username: process.env.NEXT_PUBLIC_API_USERNAME,
      password: process.env.NEXT_PUBLIC_API_PASSWORD,
    });

    const token = authRes.data.access_token;
    if (!token) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    // Get firebaseId from query params
    const { searchParams } = new URL(request.url);
    const firebaseId = searchParams.get("firebaseId");

    if (!firebaseId) {
      return NextResponse.json({ error: "firebaseId is required" }, { status: 400 });
    }

    console.log("Fetching vitals for firebaseId:", firebaseId);

    // Fetch all vitals data
    const vitalsPromises = VALID_VITAL_TYPES.map((type) =>
      api.get(VITALS_ENDPOINT, {
        params: {
          vital_name: type,
          firebase_id: firebaseId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const vitalsResponses = await Promise.all(vitalsPromises);
    console.log(
      "Raw vitals responses:",
      vitalsResponses.map((res) => ({
        type: res.config.params.vital_name,
        status: res.status,
        data: res.data,
      }))
    );

    // Process and format the vitals data
    const vitalsData = vitalsResponses.reduce((acc, response, index) => {
      const vitalType = VALID_VITAL_TYPES[index];
      const vitalData = response.data;

      console.log(`Processing ${vitalType}:`, vitalData);

      // Handle empty or invalid responses
      if (!vitalData) {
        console.log(`No data for ${vitalType}`);
        acc[vitalType] = [];
        return acc;
      }

      // Extract the array from the response
      let formattedData = [];

      // Handle the specific API response format
      if (vitalData[vitalType] && Array.isArray(vitalData[vitalType])) {
        formattedData = vitalData[vitalType].map((item) => {
          // Special handling for blood pressure
          if (vitalType === "blood_pressure") {
            return {
              systolic: parseFloat(item.systolic) || 0,
              diastolic: parseFloat(item.diastolic) || 0,
              timestamp: item.created_date,
              unit: "mmHg",
              id: item.id,
            };
          }

          // Get the correct field name for other vital types
          const fieldName = FIELD_MAPPINGS[vitalType];
          return {
            value: parseFloat(item[fieldName]) || 0,
            timestamp: item.created_date,
            unit: item.unit || getVitalUnit(vitalType),
            id: item.id,
          };
        });
      }

      // Filter out invalid values
      acc[vitalType] = formattedData.filter((item) => {
        if (vitalType === "blood_pressure") {
          return item.systolic !== 0 && item.diastolic !== 0;
        }
        return item.value !== 0;
      });

      console.log(`Formatted ${vitalType}:`, acc[vitalType]);
      return acc;
    }, {});

    // Check if we have any data
    const hasData = Object.values(vitalsData).some((arr) => arr.length > 0);
    if (!hasData) {
      console.log("No valid vitals data found");
      return NextResponse.json({
        success: true,
        data: {},
        message: "No vitals data found for this user",
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      data: vitalsData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching vitals:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      stack: error.stack,
    });

    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
        case 403:
          return NextResponse.json({ error: "Access denied" }, { status: 403 });
        case 404:
          return NextResponse.json({ error: "Vitals data not found" }, { status: 404 });
        default:
          return NextResponse.json(
            {
              error: "Failed to fetch vitals data",
              details: error.response.data,
            },
            { status: error.response.status }
          );
      }
    }

    // Handle network errors
    if (error.request) {
      return NextResponse.json({ error: "Network error. Please check your connection." }, { status: 503 });
    }

    // Handle other errors
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

// Helper function to get the appropriate unit for each vital type
function getVitalUnit(vitalType) {
  const units = {
    blood_pressure: "mmHg",
    blood_sugar: "mmol/L",
    temperature: "°C",
    weight: "kg",
    heart_rate: "bpm",
    oxygen_saturation: "%",
  };
  return units[vitalType] || "";
}
