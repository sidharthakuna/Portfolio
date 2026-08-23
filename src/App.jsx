import "@/styles/global/global.css";
import { Cursor } from "@/components/common";
import { Navbar, Footer, ScrollToTop } from "@/components/layout";
import {
  Hero,
  About,
  Skills,
  Projects,
  Journey,
  Education,
  CodingProfiles,
  Contact,
} from "@/components/sections";

function App() {
  return (
    <>
      <Cursor />
      <Navbar />

      <main>
        <Hero />

        <section className="section">
          <div className="about-skills-wrap">
            <About />
            <Skills />
          </div>
        </section>

        <Projects />
        <Journey />
        <Education />
        <CodingProfiles />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;