const AddPatientInput = {
  name: { label: "Name", placeholder: "Enter patient name", type: "text" },
  email: {
    label: "Email",
    placeholder: "Enter patient email",
    type: "email",
  },
  phone: {
    label: "Phone",
    placeholder: "Enter patient phone number",
    type: "text",
  },
  age: { label: "Age", placeholder: "Enter patient age", type: "number" },
  gender: {
    label: "Gender",
    placeholder: "Select gender",
    type: "select",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
    ],
  },
  assignedDoctor: {
    label: "Assign Doctor",
    placeholder: "Select doctor",
    type: "select",
    options: [],
  },
};

const Inputs = {
  AddPatientInput,
};

export default Inputs;
