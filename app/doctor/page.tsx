"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPatients } from "../../lib/actions/doctor.actions";
import Link from "next/link";
import { defaultStackParser } from "@sentry/nextjs";

// Define an interface for the patient object
interface Patient {
  $id: string;
  name: string;
  email: string;
  phone: string;
}

export const DoctorPatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        setError("Failed to load patient data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPatients();
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registered Patients</h1>

      {isLoading ? (
        <p>Loading patients...</p>
      ) : error ? (
        <p className="text-red-500" role="alert">
          {error}
        </p>
      ) : patients.length > 0 ? (
        <ul className="list-disc pl-5 space-y-4">
          {patients.map((patient: Patient) => (
            <li key={patient.$id}>
              <p>
                {patient.name || "Name unavailable"} -{" "}
                {patient.email || "Email unavailable"} -{" "}
                {patient.phone || "Phone unavailable"}
              </p>
              <Link
                href={`/doctor/patients/${patient.$id}/reports`}
                className="text-blue-500 hover:underline"
                aria-label={`View reports for ${patient.name || "this patient"}`}
              >
                View Reports
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No patients registered yet.</p>
      )}
    </div>
  );
};

export default DoctorPatientList