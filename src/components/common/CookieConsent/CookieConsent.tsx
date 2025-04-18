import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Snackbar,
  Alert
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
import { useTranslation } from 'react-i18next';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Always required
    analytics: true,
    marketing: true,
    preferences: false,
  });

  // Check if cookie consent has been given on component mount
  useEffect(() => {
    const consentCookie = getCookie('mountspa_cookie_consent');
    
    if (!consentCookie) {
      // No consent cookie found, show the dialog
      setOpen(true);
    }
  }, []);

  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const setCookie = (name: string, value: string, days: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  };

  const handleAcceptAll = () => {
    const allSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    saveConsent(allSettings);
  };

  const handleSavePreferences = () => {
    saveConsent(cookieSettings);
  };

  const handleNecessaryOnly = () => {
    const necessarySettings = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    saveConsent(necessarySettings);
  };

  const saveConsent = (settings: CookieSettings) => {
    // Store consent in a cookie that expires in 6 months (180 days)
    setCookie('mountspa_cookie_consent', JSON.stringify(settings), 180);
    
    // Apply the settings
    applyConsentSettings(settings);
    
    // Close the dialog
    setOpen(false);
    
    // Show confirmation snackbar
    setShowSnackbar(true);
  };

  const applyConsentSettings = (settings: CookieSettings) => {
    // Handle Google Analytics consent
    if (settings.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
    
    // Handle Microsoft Clarity consent
    if (settings.analytics && window.clarity) {
      // Microsoft Clarity doesn't have a specific API for consent management
      // But we can enable/disable it by setting clarity tracking
      window.clarity("consent");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookieSettings({
      ...cookieSettings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOpenSettings = () => {
    setOpen(true);
  };

  return (
    <>
      {/* Main cookie consent dialog */}
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        aria-labelledby="cookie-consent-dialog"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CookieIcon color="primary" />
          {t('cookieConsent.title', 'Cookie Settings')}
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1" paragraph>
            {t('cookieConsent.description', 
              'We use cookies to enhance your experience on our website. By clicking "Accept All", you agree to the use of ALL cookies. Alternatively, you can choose which types of cookies you allow.')}
          </Typography>
          
          <Typography variant="body2" paragraph>
            {t('cookieConsent.gdprInfo', 
              'This site complies with GDPR regulations. You can change your preferences at any time by clicking on the Cookie Settings button in the footer of our website.')}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={cookieSettings.necessary} 
                  name="necessary"
                  disabled // Always required
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2">{t('cookieConsent.necessary', 'Necessary')}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('cookieConsent.necessaryDescription', 
                      'These cookies are essential for the website to function properly and cannot be disabled.')}
                  </Typography>
                </Box>
              }
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={cookieSettings.analytics} 
                  onChange={handleChange} 
                  name="analytics" 
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2">{t('cookieConsent.analytics', 'Analytics')}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('cookieConsent.analyticsDescription', 
                      'These cookies help us understand how visitors interact with our website, helping us improve our services.')}
                  </Typography>
                </Box>
              }
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={cookieSettings.marketing} 
                  onChange={handleChange} 
                  name="marketing" 
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2">{t('cookieConsent.marketing', 'Marketing')}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('cookieConsent.marketingDescription', 
                      'These cookies are used to track visitors across websites to display relevant advertisements.')}
                  </Typography>
                </Box>
              }
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={cookieSettings.preferences} 
                  onChange={handleChange} 
                  name="preferences" 
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2">{t('cookieConsent.preferences', 'Preferences')}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('cookieConsent.preferencesDescription', 
                      'These cookies enable personalized features and functionality on our website.')}
                  </Typography>
                </Box>
              }
            />
          </Box>
          
          <Typography variant="body2" sx={{ mt: 2 }}>
            {t('cookieConsent.privacyInfo', 'For more information, please read our')}
            {' '}
            <Link href="/privacy-policy" target="_blank">{t('cookieConsent.privacyPolicy', 'Privacy Policy')}</Link>.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', flexDirection: {xs: 'column', sm: 'row'}, gap: 1 }}>
          <Button 
            variant="outlined" 
            onClick={handleNecessaryOnly}
            fullWidth={true}
          >
            {t('cookieConsent.necessaryOnly', 'Necessary Only')}
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleSavePreferences}
            fullWidth={true}
          >
            {t('cookieConsent.savePreferences', 'Save Preferences')}
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAcceptAll}
            fullWidth={true} 
            color="primary"
          >
            {t('cookieConsent.acceptAll', 'Accept All')}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Cookie settings updated snackbar */}
      <Snackbar 
        open={showSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          {t('cookieConsent.settingsSaved', 'Your cookie preferences have been saved!')}
        </Alert>
      </Snackbar>
      
      {/* Floating cookie settings button - shown when the banner is closed but user may want to change settings */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: 80, // Changed from 20 to 80 to position the button higher
          left: -20, 
          zIndex: 1000, 
          display: !open ? 'block' : 'none'
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<CookieIcon />}
          onClick={handleOpenSettings}
          sx={{ 
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: 'background.paper',
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'background.paper',
              opacity: 0.9,
            },
          }}
        >
          GDPR
        </Button>
      </Box>
    </>
  );
};

// For TypeScript global window property
declare global {
  interface Window {
    gtag: any;
    clarity: any;
  }
}

export default CookieConsent;