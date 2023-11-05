
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

  try {
    doc.setFontSize(14);

    doc.text(proprioName.substring(0, 50), 10, 13);

    doc.text(splitAddress(proprioAddress.substring(0, 70)), 10, 20);


    doc.text(locataireName.substring(0, 50), 130, 13);

    doc.text(splitAddress(locataireAddress.substring(0, 70)), 130, 20);

    doc.line(10, 30, 100, 30);

    doc.setFontSize(24).setFont(undefined, 'bold');
    doc.text(`Quittance de ${month}`, 105, 80, { align: 'center' }).setFont(undefined, 'normal');


    doc.setFontSize(14);
    doc.text(`Le ${date}`, 105, 90, { align: 'center' });

    doc.setFontSize(18);
    doc.text(`Pour la période du ${periodeFrom} au ${periodeTo}`, 10, 120);


    doc.text('Calcul', 180, 200);

    doc.line(10, 205, 200, 205);

    doc.text('Loyer Hors Charges', 10, 215);
    doc.text(`${loyerHc.substring(0, 7)} €`, 183, 215)

    doc.line(10, 220, 200, 220);

    doc.text('Charges', 10, 230);
    doc.text(`${charges.substring(0, 7)} €`, 183, 230);

    doc.line(10, 235, 200, 235);

    doc.text('Total', 10, 245).setFont(undefined, 'bold');
    doc.text(`${total} €`, 183, 245).setFont(undefined, 'normal');

    doc.text('Signature du propriétaire _______________', 10, 280);

    doc.setFontSize(10)
    doc.text('Made with GenQuit', 178, 295);


    const outputFilename = `Quittance-${month.replace(/ /g, '-')}-${locataireName.replace(/ /g, '-')}.pdf`;
    doc.save(outputFilename);

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }


}

