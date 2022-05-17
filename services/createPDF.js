const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = {
  createPDFDoc: (body) => {
    console.log('inside');
    // Create a document
    const doc = new PDFDocument();
      
    // Saving the pdf file in root directory.
    doc.pipe(fs.createWriteStream(`${__dirname}/../routes/example.pdf`));
    doc.fontSize(27).text(body, 100, 100);
    doc.end();
    console.log('end');


  }
};
