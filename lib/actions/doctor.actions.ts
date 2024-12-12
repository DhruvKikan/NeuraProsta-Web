"use server";

import { DATABASE_ID, PATIENT_COLLECTION_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

// FETCH PATIENTS
export const getPatients = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!);
    return parseStringify(response.documents); // Assuming patients are stored in the documents array
  } catch (error) {
    console.error("An error occurred while fetching patients:", error);
    throw error; // Throw the error for further handling
  }
};
