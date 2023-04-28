import { createTheme } from "@mui/material/styles";
import * as yup from "yup";

export const theme = createTheme({
  palette: {
    type: "dark",
    white: {
      main: "#FFFFFF",
    },
    grey: {
      main: "#7393B3",
    },
    buttonColor: {
      main: "#3F3FE0",
      contrastText: "#ffffff",
    },
    purple: {
      main: "#3F3FE0",
    },
    cyan: {
      main: "#6cb2eb",
    },
    teal: {
      main: "#4dc0b5",
    },
    blue: {
      main: "#00bcf5",
    },
    indigo: {
      main: "#6574cd",
    },
    purple: {
      main: "#6b32ca",
    },
  },
});

export const styleBackButton = {
  mt: 3,
  mb: 2,
  margin: 1,
  padding: 1,
  borderRadius: 50,
};

export const styleAvatar = {
  m: -1,
  bgcolor: "secondary.main",
};

export const styleDetailsBox = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
};

export const styleCard = {
  align: "left",
  width: "120%",
  m: 2,
  p: 2,
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
};

export const styleEditCard = {
  width: "70%",
  m: 2,
  p: 2,
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
};

export const styleEditButton = {
  mt: 3,
  mb: 2,
  margin: 1,
  padding: 1,
  width: "45%",
  borderRadius: 50,
  background: "#FBF1D3",
};

export const styleDeleteButton = {
  mt: 3,
  mb: 2,
  margin: 1,
  padding: 1,
  width: "45%",
  borderRadius: 50,
  background: "#FFA1A1",
};

export const styleButton = {
  height: "auto",
  align: "center",
  borderRadius: 50,
  color: "white",
};

export const styleCustomizeButton = {
  mt: 3,
  mb: 2,
  width: "80%",
  height: "45px",
  align: "center",
  borderRadius: 50,
  color: "white",
};

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a valid email")
    .required("Please Enter a valid email"),
  name: yup.string().required(),
});
