import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector } from "react-redux";
import { SLICE_NAME } from "../redux/FeeSlice";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function TotalFee() {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { feeAmount } = useSelector((state) => state[SLICE_NAME]);
  const [feeAmountKeys, setFeeAmountKeys] = useState([]) 

  useEffect(() => {
    setFeeAmountKeys(Object.keys(feeAmount))
  }, [feeAmount])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="text"
        color="inherit"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon/>}
      >
        Total Fee
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
          <div>
              {
                 feeAmountKeys.length > 0 ? feeAmountKeys.map((key, index) =>(
                  <Typography key={index} className={styles.typography}>{`${key}: ${feeAmount[key].value}`} </Typography>
                  )) 
                  :  <Typography className={styles.typography}> no order processed </Typography>
              }
          </div>
      </Popover>
    </div>
  );
}
