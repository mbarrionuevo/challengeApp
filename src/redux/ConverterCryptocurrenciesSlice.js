import { createSlice } from '@reduxjs/toolkit'

export const SLICE_NAME ="converterCryptocurrencies"
const initialState = {
  orderList:[],
}

export const converterCryptocurrenciesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    processOrderList: (state, action ) => {
      state.orderList = [...state.orderList, {...action.payload, id:state.orderList.length}]
    },
    finishOrderList: (state, action ) => {
      state.orderList = state.orderList.map( order => order.id === action.payload ? {...order, pending: false } : order )
    }
  },
})

// Action creators are generated for each case reducer function
export const { processOrderList, finishOrderList } = converterCryptocurrenciesSlice.actions

export const processOrder = orderInfomation => (dispatch, getState) => {
  const { converterCryptocurrencies: { orderList } } = getState();
  dispatch(processOrderList({...orderInfomation, id: orderList.length, recived:`${orderInfomation.recived} ${orderInfomation.currency}`, send:`${orderInfomation.send} USD` }))
  if(orderInfomation.pending){
    setTimeout(() => {
      dispatch(finishOrderList(orderList.length));
    }, 60 * 1000 );
  }
};

export default converterCryptocurrenciesSlice.reducer