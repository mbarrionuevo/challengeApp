import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  {
    field: 'operationType',
    headerName: 'Operation Type',
    minWidth: 200,
  },
  {
    field: 'orderType',
    headerName: 'Order type',
    minWidth: 200,
  },
  {
    field: 'currency',
    headerName: 'Cryptocurrency',
    minWidth: 200,
  },
  {
    field: 'currencyPrice',
    headerName: 'Currency Price',
     minWidth: 200,
  },
  {
    field: 'send',
    headerName: 'Currency amount',
    minWidth: 300,
  },
  {
    field: 'recived',
    headerName: "Recived",
    minWidth: 300,
  }
];

export default function DataTable( { rows }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}