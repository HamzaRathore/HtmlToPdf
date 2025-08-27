import axios from "axios";

const API_URL = "http://localhost:5000";

export const generatePdfFromHtml = async (htmlContent,options) => {
  try {
    const response = await axios.post(
      `${API_URL}/generate-pdf`,
      { htmlContent,options },
      {
        responseType: "blob", // expect Response in binary data (blob) 
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
};