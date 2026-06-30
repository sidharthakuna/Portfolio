import { useEffect, useState } from "react";
import JourneyWeb from "./Journey/JourneyWeb";
import JourneyMobile from "./Journey/JourneyMobile";

// Breakpoint that matches your CSS (≤768px = mobile snake layout)
const MOBILE_BREAKPOINT = 768;

function Journey() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? <JourneyMobile /> : <JourneyWeb />;
}

export default Journey;