import React from 'react';
import Lottie from 'react-lottie';
import GiftBoxAnimation from '../../assets/lottie/Gift Box.json';
import GiftBoxPretoeBranco from '../../assets/lottie/Gift Box  (preto e branco).json';

const GiftBox = ({ pause, stop, valor }) => {
  const animation = valor < 0 ? GiftBoxAnimation : GiftBoxPretoeBranco;

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
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
