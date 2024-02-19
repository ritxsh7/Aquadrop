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
