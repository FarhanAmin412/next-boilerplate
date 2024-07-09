"use client";

import { notFound } from "next/navigation";
import React, { useEffect } from "react";

const admin = () => {
  const adminSettings = "";
  if (!adminSettings) {
    notFound();
  }
  useEffect(() => {
    setTimeout(() => {
      console.log("fghj");
    }, 4000);
  }, []);
  return <div>admin page</div>;
};

export default admin;
