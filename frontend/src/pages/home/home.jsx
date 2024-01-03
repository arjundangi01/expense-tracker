import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onGetAllProducts } from "../../redux/product/product.action";
import Card from "./components/card";
import Sidebar from "./components/sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);

  const { allProducts, totalAmount } = useSelector(
    (store) => store.productReducer
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetAllProducts());
  }, []);

  return (
    <main className=" lg:w-[90%] m-auto flex max-h-[90vh]  gap-2 ">
      <section
        id="1"
        className="border-r-[1px] border-r-black px-2 lg:w-[70%] max-h-[100%]"
      >
        <div className="flex justify-around gap-6 ">
          <div className="bg-[#42224a] rounded-xl px-2 py-2 text-white w-[50%] ">
            <p>Total</p>
            <h1 className="text-[2rem]">₹ {totalAmount}</h1>
          </div>
          <div className="bg-[#ca3d47] rounded-xl px-2 py-2 text-white w-[50%] ">
            <p> Budget Limit</p>
            <h1 className="text-[2rem]">₹ {loginUserDetail?.limit}</h1>
          </div>
        </div>
        {/*  */}
        <div className="flex w-full gap-3 cursor-pointer border-b my-4 font-bold text-gray-500 ">
          <p>ALl</p>
          <p>Food</p>
          <p>Rent</p>
          <p>Transportation</p>
          <p>Entertainment</p>
        </div>
        <div className="w-[100%] m-auto max-h-[80%] px-2 overflow-y-scroll  custom-scrollbar">
          {allProducts?.map((ele) => (
            <Card {...ele} onGetAllProducts={onGetAllProducts} />
          ))}
        </div>
      </section>
      <section id="side" className="w-[30%] px-3 py-4 ">
        <Sidebar />
      </section>
    </main>
  );
};

export default Home;
