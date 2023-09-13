/* eslint-disable @next/next/no-img-element */
import React from 'react';

function FloatingMeteor() {
  return (
    <div className="w-full h-screen absolute top-1/2 left-0 meteor-float">
      <div className="w-[40px] absolute top-0 left-60">
        <img src="/assets/images/meteor.svg" alt="meteor" className="-z-10 meteor-wheel" />
      </div>
      <div className="w-[40px] absolute top-60 left-1/4">
        <img src="/assets/images/meteor.svg" alt="meteor" className="-z-10 meteor-wheel" />
      </div>
      <div className="w-[32px] absolute top-72 right-1/3">
        <img src="/assets/images/meteor.svg" alt="meteor" className="-z-10 meteor-wheel" />
      </div>
      <div className="w-[32px] absolute top-1/2 right-48">
        <img src="/assets/images/meteor.svg" alt="meteor" className="-z-10 meteor-wheel" />
      </div>
      <div className="w-[40px] absolute top-8 left-1/2">
        <img src="/assets/images/meteor-2.svg" alt="meteor" className="-z-10 meteor-wheel-2" />
      </div>
      <div className="w-[40px] absolute top-20 right-44">
        <img src="/assets/images/meteor-2.svg" alt="meteor" className="-z-10 meteor-wheel-2" />
      </div>
      <div className="w-[40px] absolute top-1/3 left-40">
        <img src="/assets/images/meteor-2.svg" alt="meteor" className="-z-10 meteor-wheel-2" />
      </div>

      <div className="w-[40px] absolute bottom-20 left-40">
        <img src="/assets/images/meteor.svg" alt="meteor" className="-z-10 meteor-wheel" />
      </div>
      <div className="w-[40px] absolute bottom-60 left-1/3">
        <img src="/assets/images/meteor.svg" alt="meteor" className="-z-10 meteor-wheel" />
      </div>
      <div className="w-[32px] absolute bottom-72 right-1/2">
        <img src="/assets/images/meteor.svg" alt="meteor" className="-z-10 meteor-wheel" />
      </div>
      <div className="w-[40px] absolute bottom-8 left-1/2">
        <img src="/assets/images/meteor-2.svg" alt="meteor" className="-z-10 meteor-wheel-2" />
      </div>
      <div className="w-[40px] absolute bottom-20 right-80">
        <img src="/assets/images/meteor-2.svg" alt="meteor" className="-z-10 meteor-wheel-2" />
      </div>
    </div>
  );
}

export default FloatingMeteor;
