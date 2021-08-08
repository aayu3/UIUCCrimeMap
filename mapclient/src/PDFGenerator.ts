import jsPDF from "jspdf";
import "jspdf-autotable";
import { JSCrimeEvent } from "./App";
export const generatePDFBody = (crimes: JSCrimeEvent[]) => {
  var pdfBody = [];
  for (var i = 0; i < crimes.length; i++) {
    let crime = crimes[i];
    console.log(crime.Description);
    pdfBody[i] = [
      crime.CaseID,
      crime.DateReported,
      crime.TimeReported,
      crime.DateOccurred,
      crime.TimeOccurred,
      crime.StreetAddress,
      crime.Description,
      crime.Disposition,
    ];
  }
  return pdfBody;
};
export const generatePDF = (crimes: JSCrimeEvent[]) => {
  const doc = new jsPDF("l");
  let pdfBody = generatePDFBody(crimes);
  // Or use javascript directly:
  (doc as any).autoTable({
    head: [
      [
        "Incident",
        "Date Reported",
        "Time Reported",
        "Date Occurred",
        "Time Occurred",
        "General Location",
        "Crime Description",
        "Disposition",
      ],
    ],
    body: pdfBody,
  });
  return doc;
};
