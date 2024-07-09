"use client";

import React from "react";

const error = ({ reset }: { reset: () => void }) => {
  return (
    <div className="bg-teal-600 text-red-500 flex justify-between items-center">
      <div></div>
      <p>error in main app</p>
      <button onClick={reset} className="py-2 px-4 bg-yellow-400 rounded-3xl"> Refresh </button>
      <div></div>
    </div>
  );
};

export default error;
