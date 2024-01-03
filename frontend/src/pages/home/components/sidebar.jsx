import React, { useState } from "react";
import Svg from "../../../components/svg";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { onGetAllProducts } from "../../../redux/product/product.action";
import { useDispatch } from "react-redux";
import { getUserDetailAction } from "../../../redux/user/user.action";

const initialObj = {
  title: "",
  amount: "",
  category: "",
};
const Sidebar = () => {
  const notifyError = (msg) => toast.error(msg);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLimitLoading, setIsLimitLoading] = useState(false);
  const [expenseObj, setExpenseObj] = useState(initialObj);
  const [limit, setlimit] = useState(null);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setExpenseObj({ ...expenseObj, [name]: value });
  };
  const handleLimit = (event) => {
    const { value, name } = event.target;
    setlimit(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userToken = Cookies.get("auction_token");
    if (!userToken) {
      notifyError("Please Login First");
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
      console.log(res);
      dispatch(onGetAllProducts());
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
    setIsLimitLoading(true);

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/expenses/budget`,
        {limit},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(res);
      setlimit(0)
      dispatch(getUserDetailAction());

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
          name="title"
          type="text"
          value={limit}
          placeholder="Enter Limit"
          required
          className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
        />

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

export default Sidebar;
