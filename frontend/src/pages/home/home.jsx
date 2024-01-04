import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onGetAllExpense } from "../../redux/Expense/expense.action";
import Card from "./components/card";
import AddExpense from "./components/addExpense";
import { LoadingIcon } from "../../components/loading";
import Chart from "./components/chart";
import { monthObj, yearObj } from "../../utils/date";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);
  const notifySuccess = (msg) => toast.success(msg);

  const { allExpenses, totalAmount, budgetLimit } = useSelector(
    (store) => store.expenseReducer
  );
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState("table");
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  useEffect(() => {
    setLoading(true);
    dispatch(onGetAllExpense(filter, setLoading, month, year));
  }, [filter, month, year]);

  return (
    <main className=" lg:w-[90%]  m-auto flex min-h-[90vh] max-h-[90vh]  gap-2 ">
      <Toaster />

      <section id="1" className=" px-2  w-[100%] min-h-[100%] max-h-[100%]">
        <div className="flex justify-around gap-2 sm:gap-6 ">
          <div className="bg-[#42224a] rounded-xl px-2 py-2 text-white w-[50%] ">
            <p>Total {filter != "all" ? "(" + filter + ")" : ""} </p>
            <p>
              {" "}
              {monthObj[month]} {yearObj[year]}
            </p>
            <h1 className="text-[1.5rem] md:text-[2rem] font-bold">
              ₹ {totalAmount}{" "}
            </h1>
          </div>
          <div className="bg-[#ca3d47] rounded-xl px-2 py-2 text-white w-[50%] ">
            <p> Budget Limit</p>
            <p>
              {" "}
              {monthObj[month]} {yearObj[year]}
            </p>
            <h1 className="text-[1.5rem] md:text-[2rem] font-bold">
              ₹ {budgetLimit?.amount ? budgetLimit?.amount : "0"}
            </h1>
          </div>
        </div>
        {/*  */}
        <div className="flex w-full gap-3 cursor-pointer my-4 font-bold">
          <div
            className={` ${
              tab == "table" ? "bg-blue-500 text-white" : ""
            } py-2 px-2 rounded-lg `}
            onClick={() => setTab("table")}
          >
            Table
          </div>
          <div
            className={` ${
              tab == "add" ? "bg-blue-500 text-white" : ""
            } py-2 px-2 rounded-lg `}
            onClick={() => setTab("add")}
          >
            ADD
          </div>
          <div
            className={` ${
              tab == "Dashboard" ? "bg-blue-500 text-white" : ""
            } py-2 px-2 rounded-lg `}
            onClick={() => setTab("Dashboard")}
          >
            Dashboard
          </div>
        </div>
        {tab == "table" && (
          <div>
            <select
              onChange={(e) => setMonth(e.target.value)}
              id="month"
              value={month}
              name="month"
            >
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
              onChange={(e) => setYear(e.target.value)}
              id="year"
              name="year"
              value={year}
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        )}
        {tab == "table" ? (
          <>
            <div className="flex w-full gap-3 cursor-pointer  my-4 font-bold overflow-x-scroll py-1 sm:overflow-visible ">
              <p
                onClick={() => setFilter("all")}
                className={`${
                  filter == "all"
                    ? "border-b-[2px] border-b-blue-600"
                    : "text-gray-500"
                }`}
              >
                ALL
              </p>
              <p
                onClick={() => setFilter("food")}
                className={`${
                  filter == "food"
                    ? "border-b-[2px] border-b-blue-600 "
                    : "text-gray-500"
                }`}
              >
                Food
              </p>
              <p
                onClick={() => setFilter("rent")}
                className={`${
                  filter == "rent"
                    ? "border-b-[2px] border-b-blue-600"
                    : "text-gray-500"
                }`}
              >
                Rent
              </p>
              <p
                onClick={() => setFilter("transportation")}
                className={`${
                  filter == "transportation"
                    ? "border-b-[2px] border-b-blue-600"
                    : "text-gray-500"
                }`}
              >
                Transportation
              </p>
              <p
                onClick={() => setFilter("entertainment")}
                className={`${
                  filter == "entertainment"
                    ? "border-b-[2px] border-b-blue-600"
                    : "text-gray-500"
                }`}
              >
                Entertainment
              </p>
            </div>
            {loading ? (
              <LoadingIcon />
            ) : allExpenses?.length == 0 ? (
              <div className="flex justify-center w-full ">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/004/968/529/small/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-with-editable-stroke-line-outline-linear-vector.jpg" />
              </div>
            ) : (
              <div className="w-[100%] m-auto min-h-[60%] max-h-[60%] px-2 overflow-y-scroll  custom-scrollbar">
                {allExpenses?.map((ele) => (
                  <Card
                  key={ele?._id}
                    {...ele}
                    setIsLoading={setLoading}
                    filter={filter}
                    onGetAllExpense={onGetAllExpense}
                    month={month}
                    year={year}
                  />
                ))}
              </div>
            )}
          </>
        ) : tab == "add" ? (
          <div className="lg:w-[70%] m-auto">
            <AddExpense
              setLoading={setLoading}
              filter={filter}
              month={month}
              year={year}
              setTab={setTab}
              notifySuccess={notifySuccess}
            />
          </div>
        ) : (
          <div className="flex justify-center w-full ">
            <Chart />
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
