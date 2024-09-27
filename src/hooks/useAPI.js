import axios from "axios";
import { toast } from "sonner";

// hospitalId will be passed as an argument instead of calling the hook here
export function useAPI() {
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
  return { addPatient, updatePatient };
}
