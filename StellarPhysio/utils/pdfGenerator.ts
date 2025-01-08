import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png'; // Ensure you have a logo image in the assets folder

export const generatePDFReport = async (reportData: any[], reportType: string, timeFrame: string) => {
  const doc = new jsPDF();

  // Add logo
  const img = new Image();
  img.src = logo;
  doc.addImage(img, 'PNG', 10, 10, 50, 20);

  // Add title
  doc.setFontSize(18);
  doc.text(`Report: ${reportType}`, 70, 20);
  doc.setFontSize(12);
  doc.text(`Time Frame: ${timeFrame}`, 70, 30);

  // Add table
  const tableColumn = ['Timestamp', 'Level', 'Message'];
  const tableRows: any[] = [];

  reportData.forEach(log => {
    const logData = [log.timestamp, log.level, log.message];
    tableRows.push(logData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'grid',
    headStyles: { fillColor: [58, 135, 173] },
  });

  // Save the PDF
  doc.save(`${reportType}_report_${timeFrame}.pdf`);
};