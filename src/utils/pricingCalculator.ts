import { HotTube } from "../models/HotTubeModel";
import { Accessory, ServicePackage } from "./hottubes";

// Define a more flexible AccessoriesState interface that can handle any accessory ID
interface AccessoriesState {
  [key: string]: boolean;
}

// Global data stores for accessories and service packages
let accessoriesData: Accessory[] = [];
let servicePackagesData: ServicePackage[] = [];

/**
 * Initialize accessories data
 * @param accessories Array of accessories to use for pricing calculations
 */
export const initializeAccessoriesData = (accessories: Accessory[]): void => {
  accessoriesData = accessories;
};

/**
 * Initialize service packages data
 * @param packages Array of service packages to use for pricing calculations
 */
export const initializeServicePackagesData = (packages: ServicePackage[]): void => {
  servicePackagesData = packages;
};

/**
 * Calculate financing options for a hot tub
 * @param totalAmount The total amount to finance
 * @param monthlyInterestRate Monthly interest rate as decimal (0.005 = 0.5%)
 * @param termInMonths Loan term in months
 * @param maxLoanAmount Maximum amount that can be financed
 * @returns Object with monthly payment and any upfront payment required
 */
export const calculateFinancing = (
  totalAmount: number,
  monthlyInterestRate: number = 0.005,
  termInMonths: number = 36,
  maxLoanAmount: number = 50000
): { monthlyPayment: number; upfrontPayment: number } => {
  // If the total is higher than max loan amount, calculate upfront payment
  const financedAmount = Math.min(totalAmount, maxLoanAmount);
  const upfrontPayment = Math.max(0, totalAmount - maxLoanAmount);
  
  // Monthly payment calculation formula:
  // P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  // Where:
  // P = payment
  // L = loan amount
  // c = monthly interest rate (as a decimal)
  // n = number of payments (term in months)
  
  if (financedAmount <= 0) {
    return { monthlyPayment: 0, upfrontPayment };
  }
  
  // Avoid division by zero if monthly interest rate is zero
  if (monthlyInterestRate === 0) {
    return {
      monthlyPayment: financedAmount / termInMonths,
      upfrontPayment
    };
  }
  
  const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termInMonths);
  const denominator = Math.pow(1 + monthlyInterestRate, termInMonths) - 1;
  const monthlyPayment = financedAmount * (numerator / denominator);
  
  return {
    monthlyPayment,
    upfrontPayment
  };
};

/**
 * Calculate additional costs based on selected options
 */
export const calculateAdditionalCosts = (
  hottub: HotTube | undefined,
  selectedWaterCareId: string,
  selectedEntertainmentId: string,
  selectedControlId: string,
  accessories: AccessoriesState,
  servicePackage: string
): number => {
  if (!hottub) return 0;
  
  let additionalCost = 0;
  
  // Add water care system cost
  const selectedWaterCare = hottub.additionalOptions?.waterCare?.find(
    (option) => option.id === selectedWaterCareId
  );
  if (selectedWaterCare) {
    additionalCost += selectedWaterCare.price;
  }
  
  // Add entertainment system cost
  const selectedEntertainment = hottub.additionalOptions?.entertainment?.find(
    (option) => option.id === selectedEntertainmentId
  );
  if (selectedEntertainment) {
    additionalCost += selectedEntertainment.price;
  }
  
  // Add control system cost
  const selectedControl = hottub.additionalOptions?.control?.find(
    (option) => option.id === selectedControlId
  );
  if (selectedControl) {
    additionalCost += selectedControl.price;
  }
  
  // Add accessories costs - dynamic approach
  if (accessoriesData && accessoriesData.length > 0) {
    // Add costs from loaded accessories data
    accessoriesData.forEach(accessory => {
      if (accessories[accessory.id]) {
        additionalCost += accessory.price;
      }
    });
  }
  
  // Add service package cost - using the global servicePackagesData array
  if (servicePackage && servicePackage !== 'none' && servicePackagesData.length > 0) {
    const selectedPackage = servicePackagesData.find(
      pkg => pkg.id === servicePackage
    );
    if (selectedPackage) {
      additionalCost += selectedPackage.price;
    }
  }
  
  return additionalCost;
};

/**
 * Format number with spaces between thousands
 * @param num Number to format
 * @returns Formatted number string with spaces between thousands
 */
const formatNumberWithSpaces = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/**
 * Calculate total price including base price and all additional costs
 */
export const calculateTotalPrice = (
  hottub: HotTube | undefined,
  selectedWaterCareId: string,
  selectedEntertainmentId: string,
  selectedControlId: string,
  accessories: AccessoriesState,
  servicePackage: string
): string => {
  if (!hottub) return "0 zł";
  
  const basePrice = parseFloat(
    hottub.price.replace("$", "").replace(/,/g, "")
  );
  
  const totalPrice = basePrice + calculateAdditionalCosts(
    hottub,
    selectedWaterCareId,
    selectedEntertainmentId,
    selectedControlId,
    accessories,
    servicePackage
  );
  
  return `${formatNumberWithSpaces(totalPrice)} zł brutto`;
};

/**
 * Get the name of a selected option by its type and ID
 */
export const getSelectedOptionName = (
  hottub: HotTube | undefined,
  optionType: string,
  selectedId: string
): string => {
  if (
    !hottub ||
    !hottub.additionalOptions ||
    !hottub.additionalOptions[optionType]
  ) {
    return "";
  }
  
  const option = hottub.additionalOptions[optionType].find(
    (o) => o.id === selectedId
  );
  
  return option ? option.name : "";
};

/**
 * Get the service package name by ID
 */
export const getServicePackageName = (servicePackageId: string): string => {
  if (!servicePackageId || servicePackageId === 'none') return "";
  
  const servicePackage = servicePackagesData.find(
    pkg => pkg.id === servicePackageId
  );
  
  return servicePackage ? servicePackage.name : "";
};

/**
 * Get the total price as a number (for calculations)
 */
export const getTotalPriceValue = (
  hottub: HotTube | undefined,
  selectedWaterCareId: string,
  selectedEntertainmentId: string,
  selectedControlId: string,
  accessories: AccessoriesState,
  servicePackage: string
): number => {
  if (!hottub) return 0;
  
  const basePrice = parseFloat(
    hottub.price.replace("$", "").replace(/,/g, "")
  );
  
  return basePrice + calculateAdditionalCosts(
    hottub,
    selectedWaterCareId,
    selectedEntertainmentId,
    selectedControlId,
    accessories,
    servicePackage
  );
};