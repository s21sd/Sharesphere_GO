"use client"
import Lottie from "lottie-react";
import Animation from "../../public/HDOskFySHs.json";

export default function Home() {
  return (
    <div className="text-gray-600 body-font mt-16">
      <div className="container mx-auto px-4 lg:px-10 py-12 md:flex md:flex-row md:items-center md:justify-between">
        <div className="lg:flex-grow md:w-1/2 lg:pr-12 md:pr-8 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900">One platform, Endless Possibilities.</h1>
          <p className="mb-8 text-lg leading-relaxed font-medium">Seamless collaboration, share instantly with anyone worldwide.</p>
        </div>
        <div className="lg:max-w-xl lg:w-full md:w-1/2 w-full">
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    </div>
  );
}
