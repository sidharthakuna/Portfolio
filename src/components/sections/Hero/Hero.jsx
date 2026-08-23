import { useIsMobile } from "@/hooks";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export function Hero() {
  const isMobile = useIsMobile(768);
  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}

export default Hero;
