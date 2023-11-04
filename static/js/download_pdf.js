
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

    doc.text(proprioName, 10, 13);

    // RETOUR À LA LIGNE !
    doc.text(proprioAddress, 10, 20);


    doc.text(locataireName, 130, 13);

    // IDEM
    doc.text(locataireAddress, 130, 20);

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
    doc.text(`${loyerHc} €` , 183, 215)

    doc.line(10, 220, 200, 220);

    doc.text('Charges', 10, 230);
    doc.text(`${charges} €`, 183, 230);

    doc.line(10, 235, 200, 235);

    doc.text('Total', 10, 245).setFont(undefined, 'bold');
    doc.text(`${total} €`, 183, 245).setFont(undefined, 'normal');

    doc.text('Signature du propriétaire _______________', 10, 280);

    doc.setFontSize(10)
    doc.text('Made with GenQuit', 176, 295);


    const outputFilename = `quittance-${month.replace(/ /g, '-')}.pdf`;
    doc.save(outputFilename);

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }


}

