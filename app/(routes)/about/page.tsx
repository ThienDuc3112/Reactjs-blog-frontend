import about from "./page.module.css";

const About = () => {
  return (
    <div>
      <div className={about.front}>
        <h1>This page is not complete and will most likely stay that way</h1>
        <p>
          Hi, I{"'"}m Duc, year 1 computer engineering at NUS. At the time of
          writing this, I do not have anything to introduce (yet)
        </p>
        <p>If you want to contact me you can chat through telegram @ntduc4</p>
        <br />
        <p>Profiles:</p>
        <p>
          <a href="https://github.com/ThienDuc3112" target="_blank">
            Github
          </a>
        </p>
        <p>
          <a href="https://www.hackerrank.com/ntduc4" target="_blank">
            Hackerrank
          </a>
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/nguyen-thien-duc-9511a6289/"
            target="_blank"
          >
            Linkedin
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
