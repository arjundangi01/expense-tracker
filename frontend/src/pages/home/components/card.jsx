import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import Svg from "../../../components/svg";
import { getDate } from "../../../utils/date";
const Card = ({
  title,
  category,
  amount,
  _id,
  onGetAllExpense,
  createdAt,
  filter,
  setIsLoading,
  date,
  month,
  year,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [dateObj, setDateObj] = useState({});
  useEffect(() => {
    setDateObj(getDate(date));
  }, []);
  const onDelete = async (_id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/expenses/delete/${_id}`
      );
      console.log(response);
      dispatch(onGetAllExpense(filter, setIsLoading, month, year));
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <div className="flex gap justify-between  border my-2 py-2">
      <div className="flex items-center gap-4 ">
        <img
          className="h-6"
          src="https://assets.materialup.com/uploads/c2b5ecb4-ccae-4d53-b0fb-117058776fb4/preview.png"
          alt="img"
        />

        <div>
          <p className="text-lg sm:text-xl  font-bold ">{title}</p>
          <p className="text-sm">{category}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-[110px] sm:w-[140px] ">
        <div>
          <p className="text-lg "> ₹ {amount}</p>
          <p className="text-sm">
            {dateObj.day} {dateObj.month}
          </p>
        </div>
        <div className="bg-[#f2aa93] h-full flex items-center px-2">
          {loading ? (
            <div role="status" class="">
              <Svg />
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <ImCancelCircle onClick={() => onDelete(_id)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
