import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box} from "@mui/material";
import Grid from "@mui/material/Grid2"
import { NavigationConfig } from "../../../common/NavigationButtons/NavigationButtons";
import DocumentCard from "../../../common/CustomCard/DocumentCard";


interface DocumentData {
  fileName: string;
  fileSize: number;
  imageSrc: string;
}

interface UploadDocumentStepProps {
  setNavConfig: (config: NavigationConfig) => void;
}

const UploadDocumentStep = ({setNavConfig}:UploadDocumentStepProps) => {
  const [frontDoc, setFrontDoc] = useState<DocumentData | null>(null)
  const [backDoc, setBackDoc] = useState<DocumentData | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFront = () => {
    frontInputRef.current?.click();
  };

  const handleUploadBack = () => {
    backInputRef.current?.click();
  };

  const handleFileChangeFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setFrontDoc({
          fileName: file.name,
          fileSize: file.size / (1024 * 1024),
          imageSrc: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeBack = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackDoc({
          fileName: file.name,
          fileSize: file.size / (1024 * 1024),
          imageSrc: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };
 useEffect(() => {
    setNavConfig({
      nextLabel: "Next",
      hideBack: true, 
      skipLabel: "Skip",
      disableNext: false,
    });
  }, [setNavConfig]);


  return (
    <Box>
      <input
        ref={frontInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChangeFront}
      />
      <input
        ref={backInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChangeBack}
      />

      <Grid container spacing={2}>
        <Grid size={{xs:12,sm:6}} >
          <DocumentCard
            title="Front side of document"
            fileName={frontDoc?.fileName || ""}
            fileSize={frontDoc?.fileSize || 0}
            imageSrc={frontDoc?.imageSrc || ""}
            onDelete={() => setFrontDoc(null)}
            onUpload={handleUploadFront}
          />
        </Grid>
        <Grid size={{xs:12,sm:6}}>
          <DocumentCard
            title="Back side of document"
            fileName={backDoc?.fileName || ""}
            fileSize={backDoc?.fileSize || 0}
            imageSrc={backDoc?.imageSrc || ""}
            onDelete={() => setBackDoc(null)}
            onUpload={handleUploadBack}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadDocumentStep;
