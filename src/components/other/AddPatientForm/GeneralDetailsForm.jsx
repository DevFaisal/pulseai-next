import FormFieldInput from "./FormFieldInput";

const generalDetailsFields = [
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

export default function GeneralDetailsForm({ form }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">General Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {generalDetailsFields.map((field) => (
          <FormFieldInput
            key={field.name}
            form={form}
            name={`generalDetails.${field.name}`}
            {...field}
          />
        ))}
      </div>
    </div>
  );
}
