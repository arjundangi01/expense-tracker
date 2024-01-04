import axios from "axios";
import Cookies from "js-cookie";

export const GET_ALL_EXPENSE_SUCCESS = "GET_ALL_EXPENSE_SUCCESS";

export const onGetAllExpense =
  (filter, setLoading, month, year) => async (dispatch) => {
    const userToken = Cookies.get("auction_token");
    if (!userToken) {
      // notifyError("Please Login First");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/expenses/all/?filter=${filter}&month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch({ type: GET_ALL_EXPENSE_SUCCESS, payload: response.data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


