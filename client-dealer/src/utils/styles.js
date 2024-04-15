import { borderRadius, maxHeight } from "@mui/system";

export const RegisterShopStyles = {
  TextInput: {
    my: "1rem",
    fontSize: "2rem",
    ".MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white",
    },
    "& .MuiInputBase-input:-webkit-autofill": {
      "-webkit-text-fill-color": "black !important",
      "-webkit-box-shadow": "transparent !important ",
    },
  },
  Summary: {
    width: "100%",
    maxWidth: "550px",
    margin: "auto",
    padding: "1rem 0.7rem",
    borderRadius: "0.3rem",
    color: "#407BFF",
  },
  SummaryFields: {
    gap: "0.3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "top",
  },
};

export const InventoryStyles = {
  Table: {
    width: "90%",
    maxWidth: "850px",
    margin: "auto",
  },

  Toolkit: {
    width: "100%",
    ml: "auto",
    height: "auto",
    my: "2rem",
    justifyContent: "space-between",
    height: {
      xs: "7rem",
      md: "auto",
    },
    maxHeight: "3rem",
  },
  SearchBar: {
    width: "100%",
    maxWidth: "400px",
  },
  Button: {
    width: "150px",
  },
  Items: {
    backgroundColor: "#fff",
    margin: "1rem auto",
  },
  Alternate: {
    backgroundColor: "#f0f0f0",
  },
  RecommendBox: {
    margin: "1rem 0",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fbfbfb",
    minHeight: "2rem",
    borderRadius: "0.4rem",
    zIndex: "10",
    boxShadow: "",
  },
};
