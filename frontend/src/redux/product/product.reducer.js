import { GET_ALL_PRODUCT_SUCCESS } from "./product.action";

const initialState = {
  allProducts: [],
  totalAmount:null
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRODUCT_SUCCESS:
      return { ...state, allProducts: payload?.allExpenses,totalAmount: payload?.totalAmount};
    default:
      return state;
  }
};
