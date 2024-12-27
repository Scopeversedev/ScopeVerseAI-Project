"use client"; // For Next.js 13+ App Router

import { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/676ad260af5bfec1dbe1337c/1ifskbjk2";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      document.head.appendChild(s1);
    })();
  }, []);

  return null; // No visible UI component needed
};

export default TawkTo;
