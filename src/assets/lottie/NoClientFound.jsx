/* eslint-disable react/no-unescaped-entities */
// NoClientFound.jsx
import Lottie from "react-lottie";
import animationData from "./NoClientFound.json";

const NoClientFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mx-auto mb-2 w-40 h-40 md:h-96 md:w-96">
      <Lottie options={defaultOptions} />
      <div className="text-xs lg:text-base">
        You don't have any Appointments! Schedule Now
      </div>
    </div>
  );
};

export default NoClientFound;
