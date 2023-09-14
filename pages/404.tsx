import React from 'react';
import Lottie from 'lottie-react';
import Head from 'next/head';
import animationData from 'lotties/page-not-found.json';

function Custom404() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(115deg, #1D1342 -2.03%, #13102F 37.02%, #080C1C 76.06%)',
      }}
    >
      <Head>
        <title>Page not found</title>
      </Head>
      <Lottie
        {...defaultOptions}
        style={{
          overflow: 'hidden',
          minWidth: '75vw',
        }}
      />
    </div>
  );
}

export default Custom404;
