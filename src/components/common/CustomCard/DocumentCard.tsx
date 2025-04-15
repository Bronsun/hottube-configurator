import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface DocumentCardProps {
  title: string;
  fileName?: string;
  fileSize?: number; // in MB
  imageSrc?: string;
  onDelete: () => void;
  onUpload?: () => void;
}

const DocumentCard = ({
  title,
  fileName,
  fileSize,
  imageSrc,
  onDelete,
  onUpload,
}:DocumentCardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onUpload && (event.key === "Enter" || event.key === " ")) {
      onUpload();
    }
  };

  const renderMedia = () => {
    if (imageSrc) {
      return (
        <CardMedia
          component="img"
          image={imageSrc}
          alt={fileName || title}
          sx={{ maxHeight: 200, objectFit: "contain" }}
        />
      );
    }
    return (
      <Box
        sx={{
          height: 200,
          border: "1px dashed grey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {onUpload ? (
          <Button variant="outlined">Upload the photo</Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No photo
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 2, backgroundColor: "grey.100" }}>
        <Typography variant="h6">{title}</Typography>
      </Box>

      {onUpload ? (
        <Box
          onClick={onUpload}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          sx={{ cursor: "pointer", flexGrow: 1, p: 2 }}
        >
          {renderMedia()}
        </Box>
      ) : (
        <CardContent sx={{ flexGrow: 1, p: 2 }}>{renderMedia()}</CardContent>
      )}

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Typography variant="body2" sx={{ textDecoration: "underline" }}>
          {fileName || "No file"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {typeof fileSize === "number" && (
            <Typography variant="body2" sx={{ mr: 1 }}>
              {fileSize.toFixed(2)} MB
            </Typography>
          )}
          <IconButton onClick={onDelete} size="small" aria-label="delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default DocumentCard;
