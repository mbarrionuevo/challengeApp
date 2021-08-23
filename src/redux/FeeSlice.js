import { createSlice } from "@reduxjs/toolkit";

export const SLICE_NAME = "fee";
const initialState = {
  feeAmount: {}
};

export const FeeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setFee: (state, action) => {
      state.feeAmount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFee } = FeeSlice.actions;

export const processFee = (fee) => (dispatch, getState) => {
  const {
    fee: { feeAmount },
  } = getState();
  const key = Object.keys(fee)[0];
  const auxFeeValue = feeAmount[key]?.value || 0;
  const newFeeAmount = {
    ...feeAmount,
    [key]: { value: fee[key] + auxFeeValue },
  };
  dispatch(setFee(newFeeAmount));
};
export default FeeSlice.reducer;
