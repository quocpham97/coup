/* eslint-disable @next/next/no-img-element */
import React from 'react';

function Rocket() {
  return (
    <div className="w-[202px] h-auto absolute bottom-0 -left-60 flex flex-col items-center z-10 rocket">
      <img src="/assets/images/rocket.svg" alt="fuel" />
      <img src="/assets/images/fuel.svg" alt="fuel" className="w-[32px] -mt-3 -z-10  fuel" />
    </div>
  );
}

export default Rocket;
