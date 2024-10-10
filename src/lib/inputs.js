const specialties = [
  { value: "allergy_immunology", label: "Allergy & Immunology" },
  { value: "anesthesiology", label: "Anesthesiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "diagnostic_radiology", label: "Diagnostic Radiology" },
  { value: "emergency_medicine", label: "Emergency Medicine" },
  { value: "family_medicine", label: "Family Medicine" },
  { value: "internal_medicine", label: "Internal Medicine" },
  { value: "medical_genetics", label: "Medical Genetics" },
  { value: "neurology", label: "Neurology" },
  { value: "obstetrics_gynecology", label: "Obstetrics & Gynecology" },
  { value: "orthopedic_surgery", label: "Orthopedic Surgery" },
  { value: "otolaryngology", label: "Otolaryngology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "pulmonology", label: "Pulmonology" },
  { value: "radiation_oncology", label: "Radiation Oncology" },
  { value: "rehabilitation_medicine", label: "Rehabilitation Medicine" },
  { value: "surgery", label: "Surgery" },
  { value: "urology", label: "Urology" },
  { value: "cardiology", label: "Cardiology" },
  { value: "gastroenterology", label: "Gastroenterology" },
  { value: "endocrinology", label: "Endocrinology" },
  { value: "nephrology", label: "Nephrology" },
  { value: "rheumatology", label: "Rheumatology" },
  { value: "infectious_diseases", label: "Infectious Diseases" },
  { value: "geriatric_medicine", label: "Geriatric Medicine" },
  { value: "palliative_medicine", label: "Palliative Medicine" },
  { value: "sports_medicine", label: "Sports Medicine" },
  { value: "occupational_medicine", label: "Occupational Medicine" },
  { value: "preventive_medicine", label: "Preventive Medicine" },
  { value: "sleep_medicine", label: "Sleep Medicine" },
  { value: "vascular_surgery", label: "Vascular Surgery" },
  { value: "thoracic_surgery", label: "Thoracic Surgery" },
  { value: "plastic_surgery", label: "Plastic Surgery" },
  { value: "transplant_surgery", label: "Transplant Surgery" },
];

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
  weight: {
    label: "Weight",
    placeholder: "Enter patient weight in kg",
    type: "number",
  },
  height: {
    label: "Height",
    placeholder: "Enter patient height in cm",
    type: "number",
  },
  bloodType: {
    label: "Blood Type",
    placeholder: "Select blood type",
    type: "select",
    options: [
      { value: "A+", label: "A+" },
      { value: "A-", label: "A-" },
      { value: "B+", label: "B+" },
      { value: "B-", label: "B-" },
      { value: "AB+", label: "AB+" },
      { value: "AB-", label: "AB-" },
      { value: "O+", label: "O+" },
      { value: "O-", label: "O-" },
    ],
  },
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

const AddDoctorInput = {
  name: {
    label: "Name",
    type: "text",
    placeholder: "John Doe",
    type: "text",
  },
  specialty: {
    label: "Specialty",
    type: "text",
    placeholder: "Cardiologist",
    type: "select",
    options: specialties,
  },
  contact: {
    label: "Contact",
    type: "text",
    placeholder: "1234567890",
    type: "text",
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "abc@example.com",
    type: "email",
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "********",
    type: "password",
  },
};

const AddUserInput = {
  name: {
    label: "Name",
    type: "text",
    placeholder: "John Doe",
    type: "text",
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
};

const UserPasswordInput = {
  currentPassword: {
    label: "Current Password",
    type: "password",
    placeholder: "Enter current password",
  },
  newPassword: {
    label: "New Password",
    type: "password",
    placeholder: "Enter new password",
  },
  confirmPassword: {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm new password",
  },
};

const Inputs = {
  AddPatientInput,
  AddDoctorInput,
  specialties,
  AddUserInput,
  UserPasswordInput,
};

export default Inputs;
