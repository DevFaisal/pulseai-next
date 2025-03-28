import PatientVitals from "@/components/patient/PatientVitals";

export default function PatientVitalsPage({ params }) {
  const userId = params.id;
  return (
    <div>
      <PatientVitals userId={userId} />
    </div>
  );
}
