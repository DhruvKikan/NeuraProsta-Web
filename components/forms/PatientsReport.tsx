"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPatientReports } from "@/lib/actions/doctor.actions"; // Function to get patient reports

export const PatientReports = ({ patientId }: { patientId: string }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch patient reports when component mounts
    const fetchReports = async () => {
      try {
        const reportsData = await getPatientReports(patientId);
        setReports(reportsData);
      } catch (error) {
        console.log("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [patientId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="header">Patient Reports</h1>
      {isLoading ? (
        <p>Loading reports...</p>
      ) : reports.length > 0 ? (
        <ul className="list-disc pl-5 space-y-4">
          {reports.map((report) => (
            <li key={report.$id}>
              <p>
                Report ID: {report.$id} - {report.date}
              </p>
              {/* You can add a link to view detailed report if needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports available for this patient.</p>
      )}
    </div>
  );
};
