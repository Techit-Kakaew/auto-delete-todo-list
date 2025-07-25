"use client";

import { useEffect } from "react";
import { initLiff } from "@/lib/liff";

const LiffInit = () => {
  useEffect(() => {
    initLiff();
  }, []);

  return null;
};

export default LiffInit;
