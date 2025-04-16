import React, { useRef } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  IconButton 
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useTranslation } from "react-i18next";

interface ShareConfigurationDialogProps {
  open: boolean;
  onClose: () => void;
  shareableLink: string;
  onCopySuccess: () => void;
}

const ShareConfigurationDialog: React.FC<ShareConfigurationDialogProps> = ({
  open,
  onClose,
  shareableLink,
  onCopySuccess,
}) => {
  const { t } = useTranslation();
  const shareUrlRef = useRef<HTMLInputElement>(null);

  const handleCopyLink = () => {
    if (shareUrlRef.current) {
      shareUrlRef.current.select();
      document.execCommand("copy");
      onClose();
      onCopySuccess();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('hottub.actions.share', 'Share Your Hot Tub Configuration')}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareConfigurationDialog;