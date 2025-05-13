"use client";
import React from "react";
import { Circles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Circles
        height="80"
        width="80"
        color="#F9C63D"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
