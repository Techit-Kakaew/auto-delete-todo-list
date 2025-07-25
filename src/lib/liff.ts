import liff from "@line/liff";

export const initLiff = async () => {
  try {
    if (!liff.isInClient() && typeof window !== "undefined") {
      await liff.init({ liffId: "2007818941-BDL349x7" });
      return liff;
    }
  } catch (err) {
    console.error("LIFF init failed", err);
  }
};

export default liff;
