import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import moment from 'moment';
import 'moment-lunar';

function Home() {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const NEW_LUNAR_YEAR_DATE = moment()
    .year(new Date().getFullYear() + 1)
    .month(0)
    .date(1)
    .solar()
    .format('YYYY-MM-DDT00:00:00');

  useEffect(() => {
    const id = setTimeout(() => {
      const currentDate = new Date();

      const totalSeconds = (new Date(NEW_LUNAR_YEAR_DATE).getTime() - currentDate.getTime()) / 1000;

      setDays(
        Math.floor(totalSeconds / 3600 / 24).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      );
      setHours(
        (Math.floor(totalSeconds / 3600) % 24).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      );
      setMinutes(
        (Math.floor(totalSeconds / 60) % 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      );
      setSeconds(
        (Math.floor(totalSeconds) % 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      );
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [NEW_LUNAR_YEAR_DATE, days, hours, minutes, seconds]);

  return (
    <div className="h-screen relative bg-[url('/assets/images/bg-stars.svg')] bg-[var(--Very-dark-mostly-black-blue)] bg-no-repeat bg-top overflow-hidden">
      <div>
        <div className="py-36">
          <h2 className="text-center text-2xl tracking-[6px]">WE&rsquo;RE LAUNCHING SOON</h2>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="days flex flex-col gap-4">
            <div className="flip-card w-[150px] h-[160px] relative flex flex-col justify-center items-center bg-[var(--Dark-desaturated-blue)] rounded-md shadow-[0_12px_0_0_black]">
              <div className="text-8xl text-[var(--Soft-red)] text-center">{days}</div>
            </div>
            <div className="text-sm text-[var(--Grayish-blue)] text-center tracking-[2px] uppercase">
              days
            </div>
          </div>
          <div className="hours flex flex-col gap-4">
            <div className="flip-card w-[150px] h-[160px] relative flex flex-col justify-center items-center bg-[var(--Dark-desaturated-blue)] rounded-md shadow-[0_12px_0_0_black]">
              <div className="text-8xl text-[var(--Soft-red)] text-center">{hours}</div>
            </div>
            <div className="text-sm text-[var(--Grayish-blue)] text-center tracking-[2px] uppercase">
              hours
            </div>
          </div>
          <div className="minutes flex flex-col gap-4">
            <div className="flip-card w-[150px] h-[160px] relative flex flex-col justify-center items-center bg-[var(--Dark-desaturated-blue)] rounded-md shadow-[0_12px_0_0_black]">
              <div className="text-8xl text-[var(--Soft-red)] text-center">{minutes}</div>
            </div>
            <div className="text-sm text-[var(--Grayish-blue)] text-center tracking-[2px] uppercase">
              minutes
            </div>
          </div>
          <div className="seconds flex flex-col gap-4">
            <div className="flip-card w-[150px] h-[160px] relative flex flex-col justify-center items-center bg-[var(--Dark-desaturated-blue)] rounded-md shadow-[0_12px_0_0_black]">
              <div className="text-8xl text-[var(--Soft-red)] text-center">{seconds}</div>
            </div>
            <div className="text-sm text-[var(--Grayish-blue)] text-center tracking-[2px] uppercase">
              seconds
            </div>
          </div>
        </div>
        <div className="flex gap-6 justify-center absolute bottom-16 z-10 w-full">
          <div className="transition ease-in-out hover:scale-125 duration-300 cursor-pointer">
            <Image src="/assets/images/icon-facebook.svg" alt="facebook" width={24} height={24} />
          </div>
          <div className="transition ease-in-out hover:scale-125 duration-300 cursor-pointer">
            <Image src="/assets/images/icon-pinterest.svg" alt="pinterest" width={24} height={24} />
          </div>
          <div className="transition ease-in-out hover:scale-125 duration-300 cursor-pointer">
            <Image src="/assets/images/icon-instagram.svg" alt="instagram" width={24} height={24} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-60 bg-[url('/assets/images/pattern-hills.svg')] bg-no-repeat bg-cover bg-center overflow-hidden" />
    </div>
  );
}

export default Home;
