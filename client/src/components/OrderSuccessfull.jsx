//styles
import { Dialog } from "@mui/material";
import "../styles/orderDialog.css";
import checkIcon from "../images/checkIcon.png";

//routing
import { useNavigate } from "react-router-dom";

export default function OrderSuccessfull({ success, setSuccess }) {
  const navigate = useNavigate();

  return (
    <Dialog open={success} style={{ padding: "30px" }}>
      <div className="orderDialog">
        <img src={checkIcon} className="check-icon" />
        <h3>Order Successfull</h3>
        <button
          variant="primary"
          onClick={() => {
            setSuccess(false);
            navigate("/");
          }}
          style={{
            margin: "20px 0 0 0",
            padding: "0.7rem 1rem",
            border: "none",
            fontSize: "large",
            backgroundColor: "#0195FF",
            color: "white",
            borderRadius: "0.1rem",
            cursor: "pointer",
          }}
        >
          Go back to shops
        </button>
      </div>
    </Dialog>
  );
}
