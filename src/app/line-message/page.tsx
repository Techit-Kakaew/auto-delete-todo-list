"use client";

import { Profile } from "@liff/get-profile";
import liff, { Liff } from "@line/liff";
import { useEffect, useState } from "react";

const LineMessage = () => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (typeof window !== "undefined" && liff.isLoggedIn()) {
        const userProfile = await liff?.getProfile();
        setProfile(userProfile);
      }
    };

    fetchProfile();
  }, []);

  const handleSend = async () => {
    try {
      if (!liff.isInClient()) {
        alert("เปิดผ่านแอป LINE เท่านั้นถึงจะส่งข้อความได้");
        return;
      }

      await liff.sendMessages([
        {
          type: "text",
          text: "สวัสดีจาก LIFF App 👋",
        },
      ]);

      alert("ส่งข้อความเรียบร้อยแล้ว!");
      liff.closeWindow(); // ปิด LIFF ถ้าต้องการ
    } catch (error) {
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

      {profile && <pre>{JSON.stringify(profile)}</pre>}
    </div>
  );
};

export default LineMessage;
