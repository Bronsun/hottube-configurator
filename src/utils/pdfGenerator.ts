import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ServicePackage } from './hottubes';

// Global store for service packages data
let servicePackagesData: ServicePackage[] = [];

/**
 * Initialize service packages data for PDF
 * @param packages Array of service packages to use for pricing and name lookups
 */
export const initializeServicePackagesForPdf = (packages: ServicePackage[]): void => {
  servicePackagesData = packages;
};

interface HotTubDetails {
  modelName: string;
  collection: string;
  shellColorName: string;
  cabinetColorName: string;
  seating: string;
  basePrice: string;
  totalPrice: string;
  additionalOptions: {
    waterCare?: {
      name: string;
      price: number;
    };
    entertainmentSystem?: {
      name: string;
      price: number;
    };
    controlSystem?: {
      name: string;
      price: number;
    };
  };
  accessories: {
    [key: string]: {
      selected: boolean;
      price: number;
    };
  };
  servicePackage: string;
  configurationUrl?: string; // Change from hottubImageUrl to configurationUrl
}

export const generateHotTubPDF = (details: HotTubDetails): void => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add MountSPA logo
  const logoWidth = 40;
  const logoHeight = 20;
  doc.addImage('/MountSpa-logo.png', 'PNG', 15, 10, logoWidth, logoHeight);
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(43, 95, 117); // Blue-teal from theme
  doc.text('Konfiguracja Wanny SPA', 105, 20, { align: 'center' });
  
  // Add date and configuration link
  doc.setFontSize(10);
  doc.setTextColor(100);
  const today = new Date().toLocaleDateString('pl-PL');
  doc.text(`Wygenerowano dnia: ${today}`, 105, 30, { align: 'center' });
  
  // Add configuration URL (instead of image)
  if (details.configurationUrl) {
    doc.setTextColor(0, 0, 255); // Blue color for link
    doc.textWithLink('Link do Twojej wanny', 105, 40, { 
      align: 'center',
      url: details.configurationUrl 
    });
    doc.setTextColor(0);
  }
  
  // Add model information
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text(`Kolekcja ${details.collection} - ${details.modelName}`, 105, 50, { align: 'center' });
  
  // -------------------- NEW LAYOUT STARTS HERE --------------------
  let yPosition = 60;
  const leftMargin = 20;
  const pageWidth = doc.internal.pageSize.width - 40; // 40 = 20 margin on each side
  
  // Function to create a section with title
  const createSection = (title: string, yPos: number): number => {
    // Draw section title with background
    const titleHeight = 10;
    doc.setFillColor(43, 95, 117); // Blue-teal from theme
    doc.rect(leftMargin, yPos, pageWidth, titleHeight, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(255); // White text
    doc.text(title, leftMargin + 5, yPos + 7);
    
    return yPos + titleHeight;
  };
  
  // Function to add an option row
  const addOptionRow = (label: string, value: string, yPos: number): number => {
    doc.setFontSize(11);
    doc.setTextColor(0); // Black text
    doc.text(label + ":", leftMargin, yPos + 5);
    
    // Value on the right
    doc.setFont("Helvetica", 'bold');
    doc.text(value, leftMargin + 100, yPos + 5);
    doc.setFont("Helvetica", 'normal');
    
    return yPos + 10;
  };
  
  // Main configuration section
  yPosition = createSection('PODSTAWOWA KONFIGURACJA', yPosition);
  yPosition = addOptionRow('Kolor powloki', details.shellColorName, yPosition);
  yPosition = addOptionRow('Kolor obudowy', details.cabinetColorName, yPosition);
  yPosition = addOptionRow('Miejsca siedzace', details.seating, yPosition);
  
  // Space between sections
  yPosition += 10;
  
  // Additional options section
  if (details.additionalOptions.waterCare || 
      details.additionalOptions.entertainmentSystem || 
      details.additionalOptions.controlSystem ||
      Object.values(details.accessories).some(acc => acc.selected)) {
    
    yPosition = createSection('DODATKOWE FUNKCJE', yPosition);
    
    // Process water care system
    if (details.additionalOptions.waterCare) {
      const priceStr = details.additionalOptions.waterCare.price.toLocaleString() + ' PLN';
      yPosition = addOptionRow('System pielegnacji wody', 
        `${details.additionalOptions.waterCare.name} (+${priceStr})`, yPosition);
    }
    
    // Process entertainment system
    if (details.additionalOptions.entertainmentSystem) {
      const priceStr = details.additionalOptions.entertainmentSystem.price.toLocaleString() + ' PLN';
      yPosition = addOptionRow('System rozrywki', 
        `${details.additionalOptions.entertainmentSystem.name} (+${priceStr})`, yPosition);
    }
    
    // Process control system
    if (details.additionalOptions.controlSystem) {
      const priceStr = details.additionalOptions.controlSystem.price.toLocaleString() + ' PLN';
      yPosition = addOptionRow('System sterowania', 
        `${details.additionalOptions.controlSystem.name} (+${priceStr})`, yPosition);
    }
    
    // Process all accessories
    const accessoryKeys = Object.keys(details.accessories);
    if (accessoryKeys.length > 0) {
      for (const key of accessoryKeys) {
        const accessory = details.accessories[key];
        if (accessory.selected) {
          const formattedName = key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          const priceFormatted = accessory.price.toLocaleString();
          yPosition = addOptionRow(formattedName, `Wybrano (+${priceFormatted} PLN)`, yPosition);
        }
      }
    }
    
    // Process service package - Use servicePackagesData to get correct price and name
    if (details.servicePackage !== 'none') {
      const selectedPackage = servicePackagesData.find(pkg => pkg.id === details.servicePackage);
      
      if (selectedPackage) {
        const packageName = selectedPackage.name;
        const servicePackagePrice = selectedPackage.price;
        
        yPosition = addOptionRow('Pakiet serwisowy', 
          `${packageName} (+${servicePackagePrice.toLocaleString()} PLN)`, yPosition);
      }
    }
  }
  
  // Space between sections
  yPosition += 10;
  
  // Calculate total additional costs
  let totalAdditionalCost = 0;
  
  if (details.additionalOptions.waterCare) {
    totalAdditionalCost += details.additionalOptions.waterCare.price;
  }
  
  if (details.additionalOptions.entertainmentSystem) {
    totalAdditionalCost += details.additionalOptions.entertainmentSystem.price;
  }
  
  if (details.additionalOptions.controlSystem) {
    totalAdditionalCost += details.additionalOptions.controlSystem.price;
  }
  
  // Add accessory costs
  Object.values(details.accessories).forEach(accessory => {
    if (accessory.selected) {
      totalAdditionalCost += accessory.price;
    }
  });
  
  // Add service package cost - Use servicePackagesData to get correct price
  if (details.servicePackage !== 'none') {
    const selectedPackage = servicePackagesData.find(pkg => pkg.id === details.servicePackage);
    if (selectedPackage) {
      totalAdditionalCost += selectedPackage.price;
    }
  }
  
  // Parse base price
  const basePrice = parseFloat(
    details.basePrice.replace(/[^\d.-]/g, "")
  );
  
  // Calculate total from base price and additional costs
  const calculatedTotal = basePrice + totalAdditionalCost;
  
  // Pricing summary section
  yPosition = createSection('PODSUMOWANIE CENOWE', yPosition);
  
  // Draw price information with styling
  yPosition = addOptionRow('Cena podstawowa', 
    `${details.basePrice.includes('PLN') ? details.basePrice : details.basePrice + ' PLN'}`, yPosition);
  
  yPosition = addOptionRow('Dodatkowe funkcje', 
    `${totalAdditionalCost.toLocaleString()} PLN`, yPosition);
  
  // Total price with highlight
  yPosition += 5;
  doc.setDrawColor(236, 140, 63); // Orange from theme
  doc.setLineWidth(0.5);
  doc.line(leftMargin, yPosition, leftMargin + pageWidth, yPosition);
  yPosition += 5;
  
  doc.setFontSize(14);
  doc.setTextColor(43, 95, 117); // Blue-teal from theme
  doc.text('Cena calkowita:', leftMargin, yPosition + 5);
  
  doc.setFontSize(14);
  doc.setFont("Helvetica", 'bold');
  doc.text(`${calculatedTotal.toLocaleString()} PLN`, leftMargin + 100, yPosition + 5);
  doc.setFont("Helvetica", 'normal');
  
  // Add company information
  const footerY = doc.internal.pageSize.height - 40;
  doc.setFontSize(12);
  doc.setTextColor(43, 95, 117); // Blue-teal from theme
  doc.text('MountSPA', 15, footerY);
  
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text('Szaflarska 8', 15, footerY + 5);
  doc.text('34-400 Nowy Targ', 15, footerY + 10);
  doc.text('', 15, footerY + 15);
  doc.text('info@mountspa.pl', 15, footerY + 20);
  doc.text('+48 502 291 397', 15, footerY + 25);
  
  // Add contact button
  const contactBtnY = footerY + 5;
  const contactBtnWidth = 80;
  const contactBtnHeight = 10;
  const contactBtnX = doc.internal.pageSize.width - contactBtnWidth - 15;
  
  // Draw button background
  doc.setFillColor(236, 140, 63); // Orange from theme
  doc.rect(contactBtnX, contactBtnY, contactBtnWidth, contactBtnHeight, 'F');
  
  // Add button text
  doc.setFontSize(10);
  doc.setTextColor(255);
  doc.text('Kontakt do MountSPA', contactBtnX + (contactBtnWidth/2), contactBtnY + 6, { align: 'center' });
  
  // Add clickable area for the button
  doc.link(contactBtnX, contactBtnY, contactBtnWidth, contactBtnHeight, { url: 'https://mountspa.pl/kontakt' });
  
  // Add footer text
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Dziekujemy za skonfigurowanie wanny SPA w Mount SPA', 105, doc.internal.pageSize.height - 10, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Niniejsza symulacja nie stanowi oferty w rozumieniu art. 66 Kodeksu cywilnego.", 110, doc.internal.pageSize.height - 20, { align: 'center' });
  
  // Save the PDF with model name
  doc.save(`MountSPA-${details.modelName}-Konfiguracja.pdf`);
};