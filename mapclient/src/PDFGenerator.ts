import jsPDF from "jspdf";
import "jspdf-autotable";
import { CrimeEvent } from "./App";
export const generatePDFBody = (crimes: CrimeEvent[]) => {
  var pdfBody = [];
  for (var i = 0; i < crimes.length; i++) {
    let crime = crimes[i];
    pdfBody[i] = [
      crime.CaseID,
      crime.DateReported.toDateString(),
      crime.TimeReported,
      crime.DateOccurred.toDateString(),
      crime.TimeOccurred,
      crime.StreetAddress,
      crime.Description,
      crime.Disposition,
    ];
  }
  return pdfBody;
};
export const generatePDF = (crimes: CrimeEvent[]) => {
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
