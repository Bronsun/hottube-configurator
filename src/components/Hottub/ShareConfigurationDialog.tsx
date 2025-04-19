import React, { useRef, useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText 
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslation } from "react-i18next";
import { validateEmail } from "../../utils/validate";
import { Accessory } from "../../utils/hottubes";

interface ShareConfigurationDialogProps {
  open: boolean;
  onClose: () => void;
  shareableLink: string;
  onCopySuccess: () => void;
  hottubModel?: string;
  hottubConfig?: any;
  availableAccessories?: Accessory[];
}

const ShareConfigurationDialog: React.FC<ShareConfigurationDialogProps> = ({
  open,
  onClose,
  shareableLink,
  onCopySuccess,
  hottubModel = "",
  hottubConfig = {},
  availableAccessories = []
}) => {
  const { t } = useTranslation();
  const shareUrlRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  
  // Email form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleCopyLink = () => {
    if (shareUrlRef.current) {
      shareUrlRef.current.select();
      document.execCommand("copy");
      onClose();
      onCopySuccess();
    }
  };
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name) {
      setSendError(t('validation.nameRequired', 'Imię i nazwisko jest wymagane'));
      return;
    }
    
    if (!validateEmail(email)) {
      setSendError(t('validation.emailInvalid', 'Wprowadź poprawny adres email'));
      return;
    }
    
    setSending(true);
    setSendError(null);
    
    try {
      // Send to WordPress endpoint
      const response = await fetch('https://mountspa.pl/wp-json/mountspa/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: "Configuration sharing request",
          hottubModel,
          hottubConfig,
          configLink: shareableLink
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSendSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSendError(data.message || t('errors.emailSendFailed', 'Nie udało się wysłać wiadomości'));
      }
    } catch {
      setSendError(t('errors.networkError', 'Błąd sieci. Spróbuj ponownie później.'));
    } finally {
      setSending(false);
    }
  };

  // Function to get accessory name by ID for display
  const getAccessoryNameById = (id: string): string => {
    const accessory = availableAccessories?.find(acc => acc.id === id);
    if (accessory) {
      return `${accessory.name} (+${accessory.price.toLocaleString()} zł)`;
    }
    // Fallback for legacy accessories
    if (id === 'coverCradle') {
      return t('hottub.accessoryOptions.coverCradle', 'Cover Cradle') + ' (+899 zł)';
    } else if (id === 'steps') {
      return t('hottub.accessoryOptions.steps', 'Steps') + ' (+1200 zł)';
    }
    return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  // Get selected accessories to display in dialog
  const getSelectedAccessories = (): string[] => {
    const selected: string[] = [];
    if (hottubConfig?.accessories) {
      Object.entries(hottubConfig.accessories).forEach(([key, value]) => {
        if (value === true) {
          selected.push(getAccessoryNameById(key));
        }
      });
    }
    return selected;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('hottub.actions.share', 'Share Your Hot Tub Configuration')}</DialogTitle>
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab 
            icon={<FileCopyIcon />} 
            label={t('hottub.share.copyLink', 'Copy Link')}
            id="share-tab-0"
            aria-controls="share-tabpanel-0"
          />
          <Tab 
            icon={<EmailIcon />} 
            label={t('hottub.share.email', 'Email')}
            id="share-tab-1"
            aria-controls="share-tabpanel-1"
          />
        </Tabs>
        
        {/* Configuration Summary Display */}
        <Box sx={{ mt: 2, mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #eee' }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            {hottubModel} - {hottubConfig?.collection}
          </Typography>
          
          {/* Selected accessories */}
          {getSelectedAccessories().length > 0 && (
            <Box mt={1}>
              <Typography variant="subtitle2">{t('hottub.accessories', 'Accessories')}:</Typography>
              <List dense>
                {getSelectedAccessories().map((accessoryName, index) => (
                  <ListItem key={index} dense>
                    <ListItemText primary={accessoryName} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          <Typography variant="subtitle2" mt={1}>
            {t('hottub.summary.totalPrice', 'Total Price')}: {hottubConfig?.price}
          </Typography>
        </Box>
        
        {/* Copy Link Panel */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 0}
          id="share-tabpanel-0"
          aria-labelledby="share-tab-0"
          sx={{ mt: 2 }}
        >
          {activeTab === 0 && (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {t('hottub.actions.copyLink', 'Copy this link to share your current hot tub configuration with others:')}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  inputRef={shareUrlRef}
                  fullWidth
                  value={shareableLink}
                  variant="outlined"
                  size="small"
                />
                <IconButton onClick={handleCopyLink} color="primary">
                  <FileCopyIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
        
        {/* Email Panel */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 1}
          id="share-tabpanel-1"
          aria-labelledby="share-tab-1"
          sx={{ mt: 2 }}
        >
          {activeTab === 1 && (
            <>
              {sendSuccess ? (
                <Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>
                  {t('hottub.share.emailSuccess', 'Email sent successfully! We will contact you shortly.')}
                </Typography>
              ) : (
                <Box component="form" onSubmit={handleEmailSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="body2">
                    {t('hottub.share.emailDescription', 'Share this configuration via email. Enter your contact details below:')}
                  </Typography>
                  
                  <TextField
                    label={t('form.name', 'Imię i nazwisko')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    placeholder='Imię i nazwisko'
                  />
                  
                  <TextField
                    label={t('form.email', 'Email')}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    error={Boolean(sendError && !validateEmail(email))}
                    placeholder='Email'
                  />
                  
                  <TextField
                    label={t('form.phone', 'Telefon')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    placeholder='Telefon'
                  />
                  
                  {sendError && (
                    <Typography color="error" variant="body2">
                      {sendError}
                    </Typography>
                  )}
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={sending}
                  >
                    {sending 
                      ? t('common.sending', 'Wysyłanie...') 
                      : t('hottub.share.sendEmail', 'Send via Email')}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareConfigurationDialog;