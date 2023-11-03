import { jsPDF } from "jspdf";

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

// Ajoutez du contenu à votre document
doc.text('Quittance de loyer', 105, 20, { align: 'center' });

doc.setFontSize(12);
doc.text('Nom du locataire: John Doe', 20, 40);
doc.text('Adresse du locataire: 123 Rue de la Location', 20, 50);

// Ajoutez le nom du bailleur et son adresse
doc.text('Nom du bailleur: Jane Smith', 20, 60);
doc.text('Adresse du bailleur: 456 Rue du Propriétaire', 20, 70);

// Ajoutez la date du jour
const currentDate = new Date();
doc.text('Date du jour: ' + currentDate.toLocaleDateString(), 20, 80);

// Ajoutez le montant des charges et le total
const montantCharges = 200;
doc.text('Montant des charges: ' + montantCharges + ' €', 20, 90);
const montantLoyer = 1000;
const total = montantLoyer + montantCharges;
doc.text('Total à payer: ' + total + ' €', 20, 100);

doc.text('Signature du propriétaire: _______________', 105, 260, { align: 'center' });


// Enregistrez le document dans un fichier PDF
const outputFilename = 'quittance_de_loyer.pdf';
doc.save(outputFilename);

console.log(`La quittance de loyer a été générée dans ${outputFilename}`);
// Made with GenQuit