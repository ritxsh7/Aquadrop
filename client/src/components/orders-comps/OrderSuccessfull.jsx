//styles
import { Dialog } from "@mui/material";
import checkIcon from "../../images/checkIcon.png";
import dialog from "../../utils/styles/dialog";
import "../../styles/orderDialog.css";

//routing
import { useNavigate } from "react-router-dom";

export default function OrderSuccessfull({ success, setSuccess }) {
  const navigate = useNavigate();

  return (
    <Dialog open={success}>
      <div className="orderDialog">
        <img src={checkIcon} className="check-icon" />
        <h3>Order Successfull</h3>
        <button
          variant="primary"
          onClick={() => {
            setSuccess(false);
            navigate("/");
          }}
          style={dialog.center}
        >
          Go back to shops
        </button>
      </div>
    </Dialog>
  );
}
