import React, { useState } from "react";
import { Box, Typography, Tooltip, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import SaveIcon from "@mui/icons-material/Save";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { calculateFinancing, getTotalPriceValue } from "../../utils/pricingCalculator";
import EmailFormModal from "./EmailFormModal";

interface HottubPricingProps {
  totalPrice: string;
  hottub: any;
  selectedWaterCareId: string;
  selectedEntertainmentId: string;
  selectedControlId: string;
  accessories: { [key: string]: boolean };
  servicePackage: string;
  onShare: () => void;
  onGeneratePDF: () => void;
  variant?: "compact" | "full";
  configLink?: string;
}

const HottubPricing: React.FC<HottubPricingProps> = ({
  totalPrice,
  hottub,
  selectedWaterCareId,
  selectedEntertainmentId,
  selectedControlId,
  accessories,
  servicePackage,
  onShare,
  onGeneratePDF,
  variant = "full",
  configLink,
}) => {
  const { t } = useTranslation();
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  
  // Calculate financing options 
  const totalAmount = getTotalPriceValue(
    hottub,
    selectedWaterCareId,
    selectedEntertainmentId,
    selectedControlId,
    accessories,
    servicePackage
  );
  
  const { monthlyPayment, upfrontPayment } = calculateFinancing(totalAmount);
  
  const isCompact = variant === "compact";
  
  const handlePDFButtonClick = () => {
    // Open email form modal instead of directly generating PDF
    setEmailFormOpen(true);
  };
  
  const handleFormSuccess = () => {
    // This will be called after successful form submission
    onGeneratePDF();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: isCompact ? "space-between" : "flex-end",
        flexWrap: isCompact ? "wrap" : "nowrap"
      }}
    >
      {isCompact && (
        <Box sx={{ minWidth: "100%", textAlign: "center" }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            {totalPrice}
          </Typography>
          <FinancingTooltip 
            monthlyPayment={monthlyPayment} 
            upfrontPayment={upfrontPayment} 
          />
        </Box>
      )}
      
      {!isCompact && (
        <>
          <Typography 
            variant="h5" 
            color="primary" 
            fontWeight="bold"
            sx={{ textAlign: "right" }}
          >
            {totalPrice}
          </Typography>
          
          <FinancingTooltip 
            monthlyPayment={monthlyPayment} 
            upfrontPayment={upfrontPayment} 
          />
        </>
      )}
      
      <Button
        variant="outlined"
        color="primary"
        size={isCompact ? "small" : "medium"}
        startIcon={<SaveIcon />}
        onClick={onShare}
        sx={isCompact ? { flex: 1 } : {}}
      >
        {isCompact 
          ? t('common.save')
          : t('hottub.actions.saveConfig', 'Save Config')}
      </Button>
      
      <Button
        variant="contained"
        color="primary"
        size={isCompact ? "small" : "medium"}
        startIcon={<PictureAsPdfIcon />}
        onClick={handlePDFButtonClick}
        sx={isCompact ? { flex: 1 } : {}}
      >
        {t('hottub.actions.generatePDF', 'PDF')}
      </Button>
      
      <EmailFormModal
        open={emailFormOpen}
        onClose={() => setEmailFormOpen(false)}
        onSuccess={handleFormSuccess}
        hottubModel={hottub?.model || ''}
        configLink={configLink}
        hottubConfig={{
          model: hottub?.model || '',
          collection: hottub?.collection || '',
          price: totalPrice,
          waterCareId: selectedWaterCareId,
          entertainmentId: selectedEntertainmentId,
          controlId: selectedControlId,
          accessories: accessories,
          servicePackage: servicePackage
        }}
      />
    </Box>
  );
};

const FinancingTooltip: React.FC<{ monthlyPayment: number; upfrontPayment: number }> = ({ 
  monthlyPayment, 
  upfrontPayment 
}) => {
  const { t } = useTranslation();
  
  // Format numbers with spaces between thousands
  const formatNumberWithSpaces = (num: number): string => {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  return (
    <Tooltip 
      title={
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2">{t('hottub.financingDetails', '3-Year Financing Details (0.5% monthly)')}</Typography>
          <Typography variant="body2">{t('hottub.financingTerm', 'Term: 36 months')}</Typography>
          <Typography variant="body2">{t('hottub.financingMaxLoan', 'Max loan: $50,000')}</Typography>
          <Typography variant="body2">{t('hottub.financingAPR', '6% APR')}</Typography>
          <Typography variant="body2">{t('hottub.financingDisclaimer', 'This is only simulation. Please contact our advisor')}</Typography>
          {upfrontPayment > 0 && (
            <Typography variant="body2" sx={{ color: 'warning.main' }}>
              {t('hottub.financingUpfront', 'Required upfront: ${{amount}}', { amount: formatNumberWithSpaces(upfrontPayment) })}
            </Typography>
          )}
        </Box>
      }
    >
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ cursor: 'help', textDecoration: 'underline dotted' }}
      >
        {t('hottub.actions.financing', { amount: formatNumberWithSpaces(monthlyPayment) })}
      </Typography>
    </Tooltip>
  );
};

export default HottubPricing;