import React from 'react';
import Lottie from 'react-lottie';
import GiftBoxOpen from '../../assets/lottie/GiftBoxOpen.json';

const GiftBox = ({ pause, stop, valor }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: GiftBoxOpen,
  };
  return (
    <Lottie
      options={defaultOptions}
      width={30}
      height={30}
      isPaused={pause}
      isStopped={stop}
    />
  );
};

export default GiftBox;
