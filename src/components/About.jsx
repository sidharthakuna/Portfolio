function About() {
  return (
    <div id="about" className="card">
      <div className="section-title">
        <span className="title-icon">👤</span>
        About Me
      </div>

      <div className="about-text">
        <p>
          I'm a B.Tech (CSE) student at Raghu Engineering
          College, passionate about backend development
          and problem solving.
        </p>

        <p style={{ marginTop: "10px" }}>
          I enjoy building real-world applications using
          Java and Spring Boot. I'm focused on writing
          clean code, learning best practices, and building
          scalable systems.
        </p>

        <p style={{ marginTop: "10px" }}>
          Currently learning AWS, Docker, Linux, and other
          tools to become a stronger backend developer.
          Expected graduation: 2028.
        </p>
      </div>
    </div>
  );
}

export default About;