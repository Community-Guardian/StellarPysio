import { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export const generatePDFReport = async (
  reportData: any[],
  reportType: string,
  timeFrame: string
): Promise<string> => {
  try {
    const headerText = `${reportType} Report\nTime Frame: ${timeFrame}`;
    const rows = reportData
      .map(
        (log, index) =>
          `${index + 1}. ${log.timestamp} - [${log.level}] ${log.message}`
      )
      .join('\n');

    const page = PDFPage.create()
      .setMediaBox(595, 842) // A4 size
      .drawText(headerText, { x: 50, y: 780, fontSize: 16 })
      .drawText(rows, { x: 50, y: 700, fontSize: 12, width: 500, lineHeight: 15 });

    const pdfPath = await PDFDocument.create('Documents/Report.pdf')
      .addPages(page)
      .write();

    console.log('PDF generated at:', pdfPath);
    return pdfPath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
