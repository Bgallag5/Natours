import React from 'react';
import TourCard from './Tour/TourCard';

export default function Overview() {
  return (
      <main className='main'>
          <div className='card-container'>
              <TourCard />
              <TourCard />
              <TourCard />
              <TourCard />
              <TourCard />
              <TourCard />
              <TourCard />
              <TourCard />
              <TourCard />
          </div>
      </main>
  );
}
