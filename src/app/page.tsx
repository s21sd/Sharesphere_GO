"use client"
import Lottie from "lottie-react";
import Animation from "../../public/HDOskFySHs.json"
export default function Home() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center justify-between">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className=" title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900">One platform, Endless Possibilities.

          </h1>
          <p className="mb-8 text-2xl leading-relaxed font-medium">
            Seamless collaboration, share instantly with anyone worldwide.</p>

        </div>
        <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6">
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    </section>
  );
}
