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

const AddPatientInputs = {
  generalDetailsFields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter patient's first name",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter patient's last name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter patient's email",
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "weight",
      label: "Weight (kg)",
      type: "number",
      placeholder: "Enter patient's weight",
    },
    {
      name: "height",
      label: "Height (cm)",
      type: "number",
      placeholder: "Enter patient's height",
    },
  ],
  healthBackgroundFields: [
    {
      name: "medicalConditions",
      label: "Medical Conditions",
      type: "select",
      options: [
        { value: "diabetes", label: "Diabetes" },
        { value: "hypertension", label: "Hypertension" },
        { value: "asthma", label: "Asthma" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "previousSurgeries",
      label: "Previous Surgeries",
      type: "textarea",
      placeholder: "List any previous surgeries with dates",
    },
    {
      name: "ongoingTreatments",
      label: "Ongoing Treatments or Therapies",
      type: "textarea",
      placeholder: "List any ongoing treatments or therapies",
    },
    {
      name: "noKnownHistory",
      label: "No known medical history",
      type: "checkbox",
    },
  ],
  currentHealthStatusFields: [
    {
      name: "symptoms",
      label: "Symptoms",
      type: "select",
      options: [
        { value: "headache", label: "Headache" },
        { value: "fatigue", label: "Fatigue" },
        { value: "pain", label: "Pain" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "symptomIntensity",
      label: "Symptom Intensity",
      type: "slider",
      min: 0,
      max: 10,
      step: 1,
    },
    {
      name: "symptomDuration",
      label: "Symptom Duration",
      type: "text",
      placeholder: "e.g., 2 days, 1 week",
    },
    {
      name: "additionalComments",
      label: "Additional Comments",
      type: "textarea",
      placeholder: "Provide any additional details about your symptoms",
    },
    {
      name: "doctorAssigned",
      label: "Doctor Assigned",
      type: "select",
      options: doctors.map((doctor) => ({
        value: doctor.id,
        label: doctor.name,
      })),
    },
  ],
  medicationAllergiesFields: [
    {
      name: "medications",
      label: "Current Medications",
      type: "textarea",
      placeholder: "List current medications and dosages",
    },
    { name: "foodAllergies", label: "Food Allergies", type: "checkbox" },
    {
      name: "medicationAllergies",
      label: "Medication Allergies",
      type: "checkbox",
    },
    {
      name: "environmentalAllergies",
      label: "Environmental Allergies",
      type: "checkbox",
    },
    {
      name: "otherAllergies",
      label: "Other Allergies",
      type: "text",
      placeholder: "List any other allergies",
    },
  ],

  lifestyleFactorsFields: [
    {
      name: "smoking",
      label: "Smoking",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      name: "alcohol",
      label: "Alcohol Consumption",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      name: "diet",
      label: "Diet Type",
      type: "select",
      options: [
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
        { value: "non-vegetarian", label: "Non-Vegetarian" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "exerciseFrequency",
      label: "Exercise Frequency (days per week)",
      type: "slider",
      min: 0,
      max: 7,
      step: 1,
    },
    { name: "sleepHours", label: "Sleep (hours per night)", type: "number" },
  ],

  familyHealthHistoryFields: [
    {
      name: "familyConditions",
      label: "Family Health Conditions",
      type: "textarea",
      placeholder: "List any known family health conditions and the relation",
    },
    {
      name: "noKnownFamilyHistory",
      label: "No known family history",
      type: "checkbox",
    },
  ],
};

export const generalDetailsFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter patient's first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter patient's last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter patient's email",
  },
  { name: "dob", label: "Date of Birth", type: "date" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "weight",
    label: "Weight (kg)",
    type: "number",
    placeholder: "Enter patient's weight",
  },
  {
    name: "height",
    label: "Height (cm)",
    type: "number",
    placeholder: "Enter patient's height",
  },
];

const Inputs = {
  AddDoctorInput,
  specialties,
  AddUserInput,
  UserPasswordInput,
  AddPatientInputs,
};

export default Inputs;
