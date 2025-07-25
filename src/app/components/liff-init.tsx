"use client";

import { useEffect } from "react";
import { initLiff } from "@/lib/liff";

const LiffInit = () => {
  useEffect(() => {
    alert("init");
    initLiff();
  }, []);

  return null;
};

export default LiffInit;
