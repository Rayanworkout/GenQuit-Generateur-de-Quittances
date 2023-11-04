
const { jsPDF } = window.jspdf;

function createQuittance(proprioName,
  proprioAddress,
  locataireName,
  locataireAddress,
  month,
  date,
  periodeFrom,
  periodeTo,
  loyerHc,
  charges,
  total) {

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  doc.setFontSize(12);

  doc.text(proprioName, 10, 13);

  // RETOUR À LA LIGNE !
  doc.text(proprioAddress, 10, 20);


  doc.text(locataireName, 130, 13);

  // IDEM
  doc.text(locataireAddress, 130, 20);

  doc.line(10, 30, 100, 30);

  doc.setFontSize(22);
  doc.text(`Quittance de ${month}`, 105, 80, { align: 'center' });


  doc.setFontSize(14);
  doc.text(`Le ${date}`, 105, 90, { align: 'center' });

  doc.setFontSize(16);
  doc.text(`Pour la période du ${periodeFrom} au ${periodeTo}`, 10, 120);


  doc.text('Calcul', 180, 200);

  doc.line(10, 205, 200, 205);

  doc.text('Loyer Hors Charges', 10, 215);
  doc.text(loyerHc, 150, 215)

  doc.line(10, 220, 200, 220);

  doc.text('Charges', 10, 230);
  doc.text(charges, 150, 230);

  doc.line(10, 235, 200, 235);

  doc.text('Total', 10, 245);
  doc.text(total, 150, 245);

  doc.text('Signature du propriétaire: _______________', 10, 280);

  doc.setFontSize(9)
  doc.text('Made with GenQuit', 180, 295);


  const outputFilename = 'quittance_de_loyer.pdf';
  doc.save(outputFilename);

}

