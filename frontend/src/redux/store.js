import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { userReducer } from "./user/user.reducer";
import { expenseReducer } from "./Expense/expense.reducer";

const rootReducer = combineReducers({ userReducer,expenseReducer });
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
