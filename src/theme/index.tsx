import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "rgba(13, 122, 172, 1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "rgba(168, 10, 144, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(35, 43, 46, 1)",
      secondary: "rgba(35, 43, 46, 0.8)",
      disabled: "rgba(35, 43, 46, 0.6)",
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
          borderRadius: 1000,
          padding: "10px 16px 10px 16px",
          borderColor: "inherit",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
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
            color: "rgba(13, 122, 172, 1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          border:
            "1px solid rgba(35, 39, 46, 0.15)",
          boxShadow: "none",
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
                borderColor:
                  "rgba(13, 122, 172, 1)",
              },
              
          },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  "rgba(13, 122, 172, 1)",
              },
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow:
                "0 0 0 1000px rgba(246,248,249,1) inset !important",
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
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "a": {
          textDecoration: "none",
          color:"black",
          "&:hover": {
            textDecoration: "underline",
          },
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
      color:{
        main:"rgba(246, 248, 249, 1)"
      }
    })
  },
});

export default theme;
