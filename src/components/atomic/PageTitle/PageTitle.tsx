import { Typography, TypographyProps } from "@mui/material";

interface PageTitleProps extends TypographyProps {
  title: string;
}

const PageTitle = ({ title, variant = "h4", ...rest }:PageTitleProps) => {
  return (
    <Typography variant={variant} {...rest}>
      {title}
    </Typography>
  );
};

export default PageTitle;
