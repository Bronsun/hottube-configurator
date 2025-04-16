import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#EC8C3F", // New orange color as primary
      light: "#F5B078", // Lighter shade of orange
      dark: "#D67728", // Darker shade of orange
      contrastText: "#fff",
    },
    secondary: {
      main: "#2B5F75", // Complementary blue-teal color
      light: "#4D8093",
      dark: "#1A4556",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(35, 43, 46, 1)",
      secondary: "rgba(35, 43, 46, 0.8)",
      disabled: "rgba(35, 43, 46, 0.6)",
    },
    error: {
      main: "#E74C3C",
      contrastText: "#fff",
    },
    success: {
      main: "#2ECC71",
      contrastText: "#fff",
    },
    info: {
      main: "#3498DB",
      contrastText: "#fff",
    },
    warning: {
      main: "#F39C12",
      contrastText: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: "64px",
      fontWeight: 850,
    },
    h2: {
      fontSize: "48px",
      fontWeight: 850,
    },
    h3: {
      fontSize: "40px",
      fontWeight: 850,
    },
    h4: {
      fontSize: "32px",
      fontWeight: 850,
    },
    h5: {
      fontSize: "24px",
      fontWeight: 850,
    },
    h6: {
      fontSize: "20px",
      fontWeight: 850,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 700,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 1440px)": {
            maxWidth: "1440px",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 700,
          borderRadius: 4,
          padding: "10px 16px 10px 16px",
          borderColor: "inherit",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#F5B078", // Lighter orange on hover
          },
        },
        contained: {
          background: "linear-gradient(45deg, #EC8C3F 30%, #F5B078 90%)",
          "&:hover": {
            background: "linear-gradient(45deg, #D67728 30%, #EC8C3F 90%)",
          },
        },
        outlined: {
          borderColor: "#EC8C3F",
          color: "#EC8C3F",
          "&:hover": {
            backgroundColor: "rgba(236, 140, 63, 0.04)",
            borderColor: "#D67728",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "24px",
          color: "rgba(35, 43, 46, 1)",
          textDecoration: "none",
          "&:hover": {
            color: "#EC8C3F", // Orange color on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          border: "1px solid rgba(35, 39, 46, 0.15)",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(236, 140, 63, 0.15)",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            height: "48px",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#EC8C3F", // Orange border on hover
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#EC8C3F", // Orange border when focused
              },
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px rgba(246,248,249,1) inset !important",
              WebkitTextFillColor: "rgba(35, 43, 46, 1) !important",
              transition: "background-color 5000s ease-in-out 0s",
              height: "15px",
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          "& .MuiDialogTitle-root": {
            color: "#2B5F75", // Blue-teal for dialog titles
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "a": {
          textDecoration: "none",
          color: "#2B5F75", // Blue-teal for links (base state)
          "&:hover": {
            color: "#EC8C3F", // Orange for links on hover
            textDecoration: "underline",
          },
        },
        "body": {
          backgroundColor: "#FFFFFF", // Changed from #FFFAF5 to white
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#2B5F75",
          "&.Mui-checked": {
            color: "#EC8C3F",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#2B5F75",
          "&.Mui-checked": {
            color: "#EC8C3F",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#EC8C3F",
            "& + .MuiSwitch-track": {
              backgroundColor: "#F5B078",
            },
          },
        },
        track: {
          backgroundColor: "#4D8093",
        },
      },
    },
  },
});

theme = createTheme(theme, {
  palette: {
    border: theme.palette.augmentColor({
      color: {
        main: "rgba(35, 39, 46, 0.15)",
      },
      name: "border",
    }),
    background: theme.palette.augmentColor({
      color: {
        main: "#FFFFFF", // Changed from #FFFAF5 to white
      },
      name: "background",
    }),
    tertiary: theme.palette.augmentColor({
      color: {
        main: "#734C28", // Darker brown that complements the orange
        light: "#A87F5A",
        dark: "#4A2E14",
        contrastText: "#fff",
      },
      name: "tertiary",
    }),
  },
});

export default theme;
