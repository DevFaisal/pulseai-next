import axios from "axios";
import { toast } from "sonner";

// hospitalId will be passed as an argument instead of calling the hook here
export function useAPI() {
  const deleteDoctor = async (id) => {
    try {
      const response = await axios.delete(`/api/doctor/${id}`);
      if (response.status === 200) {
        toast.success("Doctor deleted successfully");
        return response;
      }
    } catch (error) {
      toast.error("Failed to delete doctor");
      console.error("Error deleting doctor:", error);
    }
  };
  const addDoctor = async (formData, hospitalId) => {
    try {
      const response = await axios.post("/api/user", {
        ...formData,
        role: "DOCTOR",
        hospitalId,
      });
      toast.success("Doctor added successfully.");
      return response;
    } catch (error) {
      console.error("Error adding doctor:::", error);
      toast.error(error.response.data.error || "Failed to add doctor");
      return error.response;
    }
  };

  const addPatient = async (formData, hospitalId) => {
    try {
      const response = await axios.post("/api/patient", {
        ...formData,
        hospitalId,
      });
      if (response.status === 201) {
        toast.success("Patient added successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Failed to add patient");
      console.error("Error adding patient:", error);
    }
  };
  const updatePatient = async (formData, id) => {
    try {
      const response = await axios.put(`/api/patient/${id}`, formData);
      if (response.status === 200) {
        toast.success("Patient updated successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Failed to update patient");
      console.error("Error updating patient:", error);
    }
  };

  const updatePatientMedication = async (formData, id) => {
    try {
      const response = await axios.put(`/api/patient/${id}/medication`, {
        name: formData.name,
        dosage: formData.dosage,
        frequency: formData.frequency,
      });
      if (response.status === 200) {
        toast.success("Patient medication updated successfully");
      }
      return response;
    } catch (error) {
      toast.error("Failed to update patient medication");
      console.error("Error updating patient medication:", error);
    }
  };
  return {
    addPatient,
    updatePatient,
    deleteDoctor,
    addDoctor,
    updatePatientMedication,
  };
}
