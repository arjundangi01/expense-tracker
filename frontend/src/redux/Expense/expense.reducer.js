import { GET_ALL_EXPENSE_SUCCESS } from "./expense.action";

const initialState = {
  allExpenses: [],
  totalAmount: null,
  budgetLimit:0,
  categoryTotals: { rent: 0, entertainment: 0, food: 0, transportation: 0 },
};

export const expenseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_EXPENSE_SUCCESS:
      return {
        ...state,
        allExpenses: payload?.filteredExpenses,
        totalAmount: payload?.totalAmount,
        categoryTotals: payload?.categoryTotals,
        budgetLimit:payload?.budgetLimit
      };
    default:
      return state;
  }
};
