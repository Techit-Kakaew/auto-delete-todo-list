"use client";

import { Profile } from "@liff/get-profile";
import { Liff } from "@line/liff";
import { useEffect, useState } from "react";
import { initLiff } from "@/lib/liff";

const LineMessage = () => {
  const [profile, setProfile] = useState<Profile>();
  const [liff, setLiff] = useState<Liff>();

  useEffect(() => {
    initLiff().then(async (l) => {
      alert("init");
      setLiff(l);
      alert(JSON.stringify(l?.getContext()));
      await l?.ready;
      const userProfile = await l?.getProfile();
      console.log(JSON.stringify(userProfile));
      setProfile(userProfile);
    });
  }, []);

  const handleSend = async () => {
    try {
      await liff?.ready;
      // if (!liff?.isInClient()) {
      //   alert("เปิดผ่านแอป LINE เท่านั้นถึงจะส่งข้อความได้");
      //   return;
      // }

      await liff?.sendMessages([
        {
          type: "text",
          text: "สวัสดีจาก LIFF App 👋",
        },
      ]);

      alert("ส่งข้อความเรียบร้อยแล้ว!");
      // liff.closeWindow(); // ปิด LIFF ถ้าต้องการ
    } catch (error) {
      alert(error);
      console.error("ส่งข้อความล้มเหลว:", error);
      alert("ส่งข้อความไม่สำเร็จ");
    }
  };

  return (
    <div>
      <h1>Line Message</h1>
      <button
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
        onClick={handleSend}
      >
        Send Message To Line
      </button>

      {liff && <pre>{JSON.stringify(liff)}</pre>}
      {liff && <pre>{JSON.stringify(liff.getContext())}</pre>}
      {profile && <pre>{JSON.stringify(profile)}</pre>}
    </div>
  );
};

export default LineMessage;
