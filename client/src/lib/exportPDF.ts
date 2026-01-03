// @ts-nocheck
import jsPDF from 'jspdf';
import type { BondSubmission } from '@shared/types';

export function exportBondSubmissionToPDF(submission: BondSubmission) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * (fontSize / 2.5);
  };

  // Helper function to add a section
  const addSection = (title: string, items: Array<[string, string | undefined | null]>, y: number) => {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(title, margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    items.forEach(([label, value]) => {
      doc.setFont(undefined, 'bold');
      doc.text(`${label}:`, margin, y);
      doc.setFont(undefined, 'normal');
      const displayValue = value ? String(value) : '—';
      y = addWrappedText(displayValue, margin + 50, y, contentWidth - 50, 10);
      y += 3;
    });

    return y + 5;
  };

  // Header
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('BOND QUESTIONNAIRE SUBMISSION', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Submitted: ${new Date(submission.createdAt).toLocaleDateString()}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Status: ${submission.status.replace('_', ' ').toUpperCase()}`, margin, yPosition);
  yPosition += 10;

  // Detainee Information
  yPosition = addSection('DETAINEE INFORMATION', [
    ['Full Name', submission.detaineeName || '—'],
    ['A-Number', submission.aNumber],
    ['Date of Birth', submission.dateOfBirth],
    ['Country of Birth', submission.countryOfBirth],
    ['Date of Entry', submission.dateOfEntry],
    ['Manner of Entry', submission.mannerOfEntry],
  ], yPosition);

  // Check if we need a new page
  if (yPosition > pageHeight - 30) {
    doc.addPage();
    yPosition = margin;
  }

  // Detention Information
  yPosition = addSection('DETENTION INFORMATION', [
    ['Detention Center', submission.detentionCenter],
    ['Date Detained', submission.dateDetained],
  ], yPosition);

  if (yPosition > pageHeight - 30) {
    doc.addPage();
    yPosition = margin;
  }

  // Eligibility Check
  const eligibilityItems: Array<[string, string | undefined | null]> = [
    ['Aggravated Felony Conviction', submission.hasAggravatedFelony ? 'YES ⚠️' : 'No'],
    ['Drug-Related Crimes', submission.hasDrugCrimes ? 'YES ⚠️' : 'No'],
    ['Detained at Port of Entry', submission.detainedAtPortOfEntry ? 'YES ⚠️' : 'No'],
    ['Prior Deportation', submission.hasPriorDeportation ? 'YES ⚠️' : 'No'],
    ['Final Removal Order', submission.hasFinalRemovalOrder ? 'YES ⚠️' : 'No'],
  ];
  yPosition = addSection('ELIGIBILITY CHECK', eligibilityItems, yPosition);

  if (yPosition > pageHeight - 30) {
    doc.addPage();
    yPosition = margin;
  }

  // Criminal History & Rehabilitation
  if (submission.criminalHistory || submission.rehabilitationEvidence) {
    yPosition = addSection('CRIMINAL HISTORY & REHABILITATION', [
      ['Criminal History', submission.criminalHistory],
      ['Rehabilitation Evidence', submission.rehabilitationEvidence],
      ['Character Letters', submission.hasCharacterLetters ? `Yes (${submission.characterLettersCount})` : 'No'],
    ], yPosition);

    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
  }

  // Community Ties
  if (submission.familyTiesInUS || submission.employmentHistory) {
    yPosition = addSection('COMMUNITY TIES', [
      ['U.S. Residence Length', submission.usResidenceLength],
      ['Current Employer', submission.currentEmployer],
      ['Fixed Address', submission.hasFixedAddress ? 'Yes' : 'No'],
      ['Current Address', submission.currentAddress],
      ['Family Ties in U.S.', submission.familyTiesInUS],
      ['Employment History', submission.employmentHistory],
      ['Property Ownership', submission.hasPropertyInUS ? 'Yes' : 'No'],
      ['Property Details', submission.propertyDetails],
    ], yPosition);

    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
  }

  // Immigration History
  if (submission.previousDeportations || submission.pendingApplications) {
    yPosition = addSection('IMMIGRATION HISTORY', [
      ['Previous Deportations', submission.previousDeportations],
      ['Pending Applications', submission.pendingApplications],
      ['Eligible for Relief', submission.eligibleForRelief ? 'Yes' : 'No'],
      ['Relief Type', submission.reliefType],
    ], yPosition);

    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
  }

  // Health & Humanitarian
  if (submission.medicalConditions || submission.specialCircumstances) {
    yPosition = addSection('HEALTH & HUMANITARIAN FACTORS', [
      ['Medical Conditions', submission.medicalConditions],
      ['Special Circumstances', submission.specialCircumstances],
    ], yPosition);

    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
  }

  // Sponsor Information
  if (submission.sponsorName) {
    yPosition = addSection('SPONSOR INFORMATION', [
      ['Sponsor Name', submission.sponsorName],
      ['Relation to Detainee', submission.sponsorRelation],
      ['Immigration Status', submission.sponsorStatus],
      ['Annual Income', submission.sponsorIncome],
      ['Phone', submission.sponsorPhone],
      ['Email', submission.sponsorEmail],
      ['Understands Risk', submission.sponsorUnderstandsRisk ? 'Yes' : 'No'],
    ], yPosition);

    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
  }

  // Contact Information
  yPosition = addSection('CONTACT INFORMATION', [
    ['Phone', submission.contactPhone],
    ['Email', submission.contactEmail],
  ], yPosition);

  // Notes
  if (submission.notes) {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    yPosition = addSection('ATTORNEY NOTES', [
      ['Notes', submission.notes],
    ], yPosition);
  }

  // Footer
  doc.setFontSize(8);
  doc.setFont(undefined, 'italic');
  doc.text(
    `Generated on ${new Date().toLocaleString()} | Amaral Law - Immigration Bond Questionnaire`,
    margin,
    pageHeight - 10
  );

  // Save the PDF
  const fileName = `Bond_Questionnaire_${submission.detaineeName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
  doc.save(fileName);
}
