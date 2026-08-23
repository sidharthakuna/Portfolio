import { useIsMobile } from "@/hooks";
import JourneyWeb from "./JourneyWeb";
import JourneyMobile from "./JourneyMobile";

export function Journey() {
  const isMobile = useIsMobile(768);
  return isMobile ? <JourneyMobile /> : <JourneyWeb />;
}

export default Journey;
