import React, { useEffect, useState } from "react";
import {
  Button,
  CardContent,
  TextField,
  Typography,
  Card,
  CardActions,
  CardHeader,
} from "@material-ui/core";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { processOrder } from "../../redux/ConverterCryptocurrenciesSlice";
import { processFee } from "../../redux/FeeSlice";

const useStyles = makeStyles({
  btnHeader: {
    display: "flex",
    justifyContent: "flex-end",
  },
  converCryptocurrencies: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    minWidth: 275,
    margin: 16,
  },
  cardHeader: {
    textAlign: "center",
    marginBottom: 24,
  },
  containerSpaceBewteen: {
    display: "flex",
    justifyContent: "space-around",
  },
  containerSend: {
    display: "flex",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    alignSelf: "flex-end",
    fontSize: 14,
    marginLeft: 6,
  },
  textCenter:{
    alignSelf: "center",
    fontSize: 14,
    marginLeft: 6,
  },
  to: {
    display: "flex",
  },
  cardAction: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
  },
});

const customStyles = {
  container: () => ({
    width: "7rem",
    margin: "1rem",
  }),
};

export default function OrderView() {
  const styles = useStyles();
  const currencies = [
    {
      value: 1,
      label: "BTC",
      price: 41592,
    },
    {
      value: 2,
      label: "ETH",
      price: 3179,
    },
    {
      value: 3,
      label: "USDC",
      price: 1,
    },
  ];
  const initialOrder = {
    send: "",
    currency: currencies[0].label,
    currencyPrice: currencies[0].price,
    operationType: "Buy",
    orderType: "Limit",
    recived: "",
    feeOrder: 0,
  };

  const dispatch = useDispatch();
  const [isModeBuy, setIsModeBuy] = useState(true);
  const [orderInformation, setOrdenInformation] = useState(initialOrder);
  const [currencySelected, setCurrencySelected] = useState(currencies[0]);
  const typeMode = `${isModeBuy ? "Buy" : "Sell"}`;

  useEffect(() => {
    setOrdenInformation({ ...initialOrder, operationType: typeMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModeBuy]);

  useEffect(() => {
    calculate(
      Number(orderInformation.send),
      orderInformation,
      setOrdenInformation,
      isModeBuy
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderInformation.currencyPrice]);

  const handleChange = ({ target: { value } }) => {
    calculate(Number(value), orderInformation, setOrdenInformation, isModeBuy);
  };

  const handleProcessOrder = () => {
    const pending = orderInformation.orderType === "Limit";
    const currency = isModeBuy ? "USD" : orderInformation.currency;
    dispatch(processOrder({ ...orderInformation, pending }));
    dispatch(processFee({ [currency]: orderInformation.feeOrder }));
    setOrdenInformation(initialOrder);
  };

  const handleChangeCurrency = ({ label, price, value }) => {
    setOrdenInformation({
      ...orderInformation,
      currency: label,
      currencyPrice: price,
    });
    setCurrencySelected({ label, price, value });
  };

  const handleChangeOrderType = ({ label }) => {
    setOrdenInformation({
      ...orderInformation,
      orderType: label,
    });
  };

  return (
    <>
      <div className={styles.btnHeader}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsModeBuy(!isModeBuy)}
        >
          {`${isModeBuy ? "Sell" : "Buy"}`}
        </Button>
      </div>
      <Card className={styles.root}>
        <CardContent>
          <CardHeader
            className={styles.cardHeader}
            title={`${typeMode} Cryto`}
            subheader={`1${currencySelected.label} ≈ USD$ ${currencySelected.price}`}
          />
          <div className={styles.containerSpaceBewteen}>
            <div>
              <div className={styles.containerSend}>
                <TextField
                  id="standard-basic"
                  label="you will pay"
                  value={orderInformation.send}
                  onChange={handleChange}
                />

                {isModeBuy ? (
                  <Typography className={styles.pos} color="textSecondary">
                    USD
                  </Typography>
                ) : (
                  <Select
                    styles={customStyles}
                    value={currencySelected}
                    options={currencies}
                    onChange={handleChangeCurrency}
                    menuPosition="fixed"
                  />
                )}
              </div>
            </div>
            <div className={styles.containerSend}>
              <Select
                defaultValue={{ value: "limit", label: "Limit" }}
                styles={customStyles}
                options={[
                  { value: "limit", label: "Limit" },
                  { value: "market", label: "Market" },
                ]}
                onChange={handleChangeOrderType}
                menuPosition="fixed"
              />
            </div>
            <div className={styles.containerSend}>
              <TextField
                id="standard-basic"
                label="you will receive"
                value={orderInformation.recived}
                InputProps={{
                  readOnly: true,
                }}
              />
              {isModeBuy ? (
                <Select
                  styles={customStyles}
                  value={currencySelected}
                  options={currencies}
                  onChange={handleChangeCurrency}
                  menuPosition="fixed"
                />
              ) : (
                <Typography className={styles.textCenter} color="textSecondary">
                  USD
                </Typography>
              )}
            </div>
          </div>
        </CardContent>
        <CardActions className={styles.cardAction}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleProcessOrder}
            disabled={!orderInformation.send}
          >
            {`${typeMode} ${currencySelected.label}`}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

function calculate(quantity, orderInformation, setOrdenInformation, isModeBuy) {
  if (quantity) {
    let fee;
    let total;
    if (isModeBuy) {
      fee = quantity * 0.015;
      total = (quantity - fee) / orderInformation.currencyPrice;
    } else {
      fee = quantity * 0.015;
      total = (quantity - fee) * orderInformation.currencyPrice;
    }
    setOrdenInformation({
      ...orderInformation,
      recived: total,
      feeOrder: fee,
      send: quantity,
    });
  } else {
    setOrdenInformation({
      ...orderInformation,
      feeOrder: 0,
      send: "",
      recived: "",
    });
  }
}
