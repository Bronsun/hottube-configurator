import React, { useState} from "react";
import { Alert, AlertTitle } from "@mui/material";

export interface NotificationProps {
  title: string;
  children?: React.ReactNode;
  severity?: "success" | "info" | "warning" | "error";
  onClose?: () => void;
}

const Notification = ({
  title,
  children,
  severity = "info",
  onClose,
}: NotificationProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <Alert severity={severity} onClose={handleClose}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
};

export default Notification;
