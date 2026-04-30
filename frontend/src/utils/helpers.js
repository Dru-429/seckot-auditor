import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDFReport = async (elementId, fileName = 'audit-report.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width
    const pageHeight = 297; // A4 height
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};

export const translateVulnerability = (technicalTerm) => {
  const translations = {
    'SQL Injection': 'Database Entry Protection Issue',
    'XSS Vulnerability': 'Web Content Security Issue',
    'Hardcoded Credentials': 'Sensitive Information Exposure',
    'Missing CSRF Protection': 'Form Submission Security Issue',
    'Weak Password Policy': 'Password Strength Issue',
    'Outdated Dependencies': 'Third-Party Software Vulnerability',
    'Missing Content-Security-Policy': 'Browser Security Header Missing',
    'Authentication Bypass': 'Login Security Issue',
    'Insecure API': 'Data Access Security Issue',
    'Unvalidated Redirect': 'Malicious Link Vulnerability',
  };

  return translations[technicalTerm] || technicalTerm;
};

export const getSeverityColor = (severity) => {
  const colors = {
    critical: 'bg-red-600',
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500',
    info: 'bg-gray-500',
  };
  return colors[severity?.toLowerCase()] || 'bg-gray-500';
};

export const getSeverityTextColor = (severity) => {
  const colors = {
    critical: 'text-red-600',
    high: 'text-red-500',
    medium: 'text-yellow-600',
    low: 'text-blue-600',
    info: 'text-gray-600',
  };
  return colors[severity?.toLowerCase()] || 'text-gray-600';
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getScoreGrade = (score) => {
  if (score >= 90) return { grade: 'A', label: 'Excellent' };
  if (score >= 75) return { grade: 'B', label: 'Good' };
  if (score >= 60) return { grade: 'C', label: 'Fair' };
  if (score >= 40) return { grade: 'D', label: 'Poor' };
  return { grade: 'F', label: 'Critical' };
};
