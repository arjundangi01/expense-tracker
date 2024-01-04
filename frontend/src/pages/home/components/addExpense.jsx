import React, { useState } from "react";
import Svg from "../../../components/svg";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { onGetAllExpense } from "../../../redux/Expense/expense.action";
import { useDispatch } from "react-redux";
import { getUserDetailAction } from "../../../redux/user/user.action";
import { monthObj } from "../../../utils/date";

const initialObj = {
  title: "",
  amount: "",
  date: "",
  category: "",
};
const AddExpense = ({
  setLoading,
  filter,
  month,
  year,
  setTab,
  notifySuccess,
}) => {
  const notifyError = (msg) => toast.error(msg);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLimitLoading, setIsLimitLoading] = useState(false);
  const [expenseObj, setExpenseObj] = useState(initialObj);
  const [limit, setlimit] = useState({ amount: "", month: "", year: "" });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setExpenseObj({ ...expenseObj, [name]: value });
  };
  const handleLimit = (event) => {
    const { value, name } = event.target;
    setlimit({ ...limit, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userToken = Cookies.get("auction_token");
    if (!userToken) {
      notifyError("Please Login First");
      return;
    }
    if (
      !expenseObj.amount ||
      !expenseObj.category ||
      !expenseObj.date ||
      !expenseObj.title
    ) {
      notifyError("Please Fill all required fields");
      return;
    }
    console.log(expenseObj);
    setExpenseObj(initialObj);
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/expenses/add`,
        expenseObj,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      notifySuccess(`${res?.data?.data?.amount}  Expense Added`);
      dispatch(onGetAllExpense(filter, setLoading, month, year));
      setTab("table");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const onLimitSubmit = async (e) => {
    e.preventDefault();
    const userToken = Cookies.get("auction_token");
    if (!userToken) {
      notifyError("Please Login First");
      return;
    }
    if (!limit.amount || !limit.month || !limit.year) {
      notifyError("Please Fill all required fields");
      return;
    }
    setIsLimitLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/expenses/budget`,
        limit,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("res", res);

      setlimit({ amount: "", month: "", year: "" });
      dispatch(onGetAllExpense(filter, setLoading, month, year));
      setTab("table");
      notifySuccess(
        `${res?.data?.budget?.amount} ${res?.data?.message} for  ${
          monthObj[parseInt(res?.data?.budget?.month)]
        } `
      );

      setIsLimitLoading(false);
    } catch (error) {
      setIsLimitLoading(false);

      console.log(error);
    }
  };

  return (
    <div className="text-center  m-auto w-full">
      <Toaster />

      <h1 className="font-bold text-[1.5rem] mb-2">Add Expenses</h1>
      <form className="space-y-6">
        <input
          onChange={handleChange}
          name="title"
          type="text"
          value={expenseObj.title}
          placeholder="Expense Name"
          required
          className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
        />
        <input
          onChange={handleChange}
          name="amount"
          type="Number"
          placeholder="Amount"
          required
          value={expenseObj.amount}
          className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
        />
        <div className="flex gap-2">
          <select
            onChange={handleChange}
            name="category"
            value={expenseObj.category}
            id=""
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <input
            onChange={handleChange}
            name="date"
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
            type="date"
          />
        </div>

        {isLoading ? (
          <button
            // type="submit"
            className="flex items-center gap-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Svg /> Loading
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ADD
          </button>
        )}
      </form>
      <h1 className="font-bold text-[1.5rem] mb-2 mt-6">Add Limit</h1>

      <form className="space-y-6 mt-4">
        <input
          onChange={handleLimit}
          name="amount"
          type="text"
          value={limit.amount}
          placeholder="Enter Limit"
          required
          className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
        />
        <div className="flex gap-2">
          <select
            onChange={handleLimit}
            id="month"
            value={limit.month}
            name="month"
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
          >
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            onChange={handleLimit}
            id="year"
            name="year"
            value={limit.year}
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
          >
            <option value="">Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        {isLimitLoading ? (
          <button
            // type="submit"
            className="flex items-center gap-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Svg /> Loading
          </button>
        ) : (
          <button
            onClick={onLimitSubmit}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ADD Limit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddExpense;
