import React, { useEffect } from "react";
import TourCard from "../components/Tour/TourCard";

import axios from "axios";
import { GET_ALL_TOURS } from "../GlobalStore/actions";
// import { calcNextStartDate } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";

export default function Overview() {
  const state = useSelector(state => state);
  const { tours } = state;
  const dispatch = useDispatch();

  const getTourData = async () => {
    const data = await axios.get("/api/v1/tours");
    return data;
  };

  useEffect(() => {
    getTourData().then((res) => {
      console.log(res);
      dispatch({ type: GET_ALL_TOURS, payload: res.data.data.document });
    });
  }, []);

  return (
    <div className="card-container">
      {tours &&
        tours.map((tour) => {
          return <TourCard tour={tour} key={tour._id} />;
        })}
    </div>
  );
}
