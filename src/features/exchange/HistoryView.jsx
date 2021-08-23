import React from "react";
import DataTable from "../../components/DataTable";
import { useSelector } from "react-redux";
import { SLICE_NAME } from "../../redux/ConverterCryptocurrenciesSlice";

export default function HistoryView() {
  const { orderList } = useSelector((state) => state[SLICE_NAME]);
  return (
    <div>
      <DataTable rows={orderList} />
    </div>
  );
}
