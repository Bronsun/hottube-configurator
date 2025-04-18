import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box,
  TextField,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { validateEmail } from '../../utils/validate';
import { Link } from 'react-router';

interface EmailFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  hottubModel: string;
  hottubConfig?: any; // Optional configuration data
  configLink?: string; // Configuration link for sharing
}

const EmailFormModal: React.FC<EmailFormModalProps> = ({ 
  open, 
  onClose, 
  onSuccess,
  hottubModel,
  hottubConfig,
  configLink
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name) {
      setError(t('validation.nameRequired', 'Imię i nazwisko jest wymagane'));
      return;
    }
    
    // Admin bypass - if name is "mountspaadmin", skip email sending and directly go to success
    if (name.toLowerCase() === 'mountspaadmin') {
      onSuccess();
      onClose();
      return;
    }
    
    if (!validateEmail(email)) {
      setError(t('validation.emailInvalid', 'Wprowadź poprawny adres email'));
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your WordPress site URL
      const response = await fetch('https://mountspa.pl/wp-json/mountspa/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          hottubModel,
          hottubConfig: hottubConfig || {},
          configLink
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.message || t('errors.emailSendFailed', 'Nie udało się wysłać wiadomości'));
      }
    } catch {
      setError(t('errors.networkError', 'Błąd sieci. Spróbuj ponownie później.'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog 
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {t('hottub.emailForm.title', 'Wygeneruj PDF ze swoją konfiguracją wanny SPA')}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom>
          {t('hottub.emailForm.description', 'Prosimy o podanie swoich danych kontaktowych, abyśmy mogli przesłać Ci wycenę i więcej informacji o wybranej wannie.')}
        </Typography>
        
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
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
            error={Boolean(error && !validateEmail(email))}
             placeholder='Email'
          />
          
          <TextField
            label={t('form.phone', 'Telefon')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
             placeholder='Telefon'
            required
          />

        <Typography variant="body2" color="text.secondary">
            Wysyłając formularz, zgadzasz się na przetwarzanie swoich danych osobowych zgodnie z naszą <Link to="https://mountspa.pl/polityka-prywatnosci/">polityką prywatności</Link> oraz  <Link to="https://mountspa.pl/regulamin/">regulaminem</Link> serwisu MountSPA.pl
        
        </Typography>
          
          
          <Button 
            type="submit"
            variant="contained" 
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading 
              ? t('common.sending', 'Wysyłanie...') 
              : t('common.send', 'Wyślij')}
          </Button>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('common.cancel', 'Anuluj')}
        </Button>
      </DialogActions>
      
      <Snackbar 
        open={Boolean(error)} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error" 
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EmailFormModal;