import React, { useState, useEffect, useContext } from 'react';
import TourCard from '../components/Tour/TourCard';

import axios from 'axios';
import { GlobalContext } from '../App';

export default function Overview() {
  const {tours, setTours} = useContext(GlobalContext)

  const getTourData = async () => {
    const data = await axios.get('http://localhost:3001/api/v1/tours');
    return data;
  };

  useEffect(() => {
    getTourData().then((res) => {
      console.log(res);
      setTours(res.data.data.document);
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

