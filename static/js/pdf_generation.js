import { jsPDF } from "jspdf";

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

doc.setFontSize(12);

doc.text('{Jane Smith}', 10, 13);

doc.text('{456 Rue du Propriétaire, 13002 Marseille}', 10, 20);


doc.text('John Doe', 130, 13);
doc.text('{Adresse du locataire: 123 Rue de la Location}', 130, 20);

doc.line(10, 30, 100, 30);

doc.setFontSize(22);
doc.text('Quittance de {Novembre 2023}', 105, 80, { align: 'center' });


// const currentDate = new Date();
// doc.text('Date du jour: ' + currentDate.toLocaleDateString(), 20, 80);


doc.setFontSize(14);
doc.text('Le {3/11/2023}', 105, 90, { align: 'center' });

doc.setFontSize(16);
doc.text('Pour la période du {01/11/2023} au {02/12/2023}', 10, 120)


doc.text('Calcul', 180, 200)

doc.line(10, 205, 200, 205);

doc.text('Loyer Hors Charges', 10, 215)

doc.line(10, 220, 200, 220);

doc.text('Charges', 10, 230)

doc.line(10, 235, 200, 235);

doc.text('Total', 10, 245)


// // Ajoutez le montant des charges et le total
// const montantCharges = 200;

// doc.text('Montant des charges: ' + montantCharges + ' €', 20, 90);
// const montantLoyer = 1000;
// const total = montantLoyer + montantCharges;
// doc.text('Total à payer: ' + total + ' €', 20, 100);

// doc.text('Signature du propriétaire: _______________', 105, 260, { align: 'center' });


// Enregistrez le document dans un fichier PDF
const outputFilename = 'quittance_de_loyer.pdf';
doc.save(outputFilename);

console.log(`La quittance de loyer a été générée dans ${outputFilename}`);
// Made with GenQuit