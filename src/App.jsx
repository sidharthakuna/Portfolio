import "./Stylings/global.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import CodingProfiles from "./components/CodingProfiles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
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
        <Certifications />
        <CodingProfiles />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;