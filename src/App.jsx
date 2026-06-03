import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section className="section">
          <div className="grid2">
            <About />
            <Skills />
          </div>
        </section>

        <Projects />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;