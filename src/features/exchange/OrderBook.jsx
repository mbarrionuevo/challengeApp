import React from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import { SLICE_NAME } from "../../redux/ConverterCryptocurrenciesSlice";

export default function OrderBook() {
  const { orderList } = useSelector((state) => state[SLICE_NAME]);
  const orderPending = orderList.filter((order) => order.pending);
  return <DataTable rows={orderPending} />;
}
