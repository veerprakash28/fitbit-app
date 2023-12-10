/* eslint-disable react/no-unescaped-entities */
// NoClientFound.jsx
import Lottie from "react-lottie";
import animationData from "./NoApoointmentsFound.json";

const NoAppointmentsFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default NoAppointmentsFound;
