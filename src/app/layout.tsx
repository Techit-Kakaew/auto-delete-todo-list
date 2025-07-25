import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import LiffInit from "./components/liff-init";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   facebook: {
//     appId: "593834620463376",
//   },
//   title: "MDN Web Docs",
//   description:
//     "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
//   metadataBase: new URL("https://auto-delete-todo-list.vercel.app/seo"),
//   openGraph: {
//     title: "MDN Web Docs",
//     description:
//       "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
//     url: "https://auto-delete-todo-list.vercel.app/seo",
//     siteName: "MDN Web Docs",
//     images: [
//       {
//         // url: "https://picsum.photos/id/237/300/300",
//         url: "https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png",
//         // url: "https://auto-delete-todo-list.vercel.app/img-share.png",
//         width: 1920,
//         height: 1080,
//         alt: "The MDN Web Docs logo, featuring a blue accent color, displayed on a solid black background.",
//         type: "image/png",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     creator: "MozDevNet",
//   },
//   viewport: "width=device-width, initial-scale=1",
// };

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <LiffInit />
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
