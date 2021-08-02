import React from "react";
import "./Team.css";

import juyoungchoi from "./images/juyoungchoi.jpg";
import aaronyu from "./images/aaronpfp.png";
import petervandervelde from "./images/peterpfp.png";
import angelshah from "./images/angelshah.jpg";
import illiaborzov from "./images/illiapfp.jpg";

const team = () => {
  return (
    <div className="team">
      <h2>Meet the Team</h2>
      <div className="break"></div>
      <div>
        <a href="https://github.com/aayu3">
          <img className="profilepic" src={aaronyu} alt="Aaron Yu" />
        </a>
        <div className="name">Aaron Yu</div>
        <div className="bio">
          Aaron is a Freshman at UIUC in Mathematics + Computer Science. In his
          spare time he enjoys playing with his cat and reading.
        </div>
      </div>

      <div>
        <a href="https://github.com/jchoi25">
          <img className="profilepic" src={juyoungchoi} alt="Juyoung Choi" />
        </a>
        <div className="name">Juyoung Choi</div>
        <div className="bio">
          Juyoung is a Freshman at UIUC majoring in Physics from South Korea. He
          enjoys observing the night sky and playing the guitar.
        </div>
      </div>
      <div>
        <a href="https://github.com/zer0key123">
          <img className="profilepic" src={illiaborzov} alt="Illia Borzov" />
        </a>

        <div className="name">Illia Borzov</div>
        <div className="bio">
          Illia is a freshman studying Computer Science at NYU. In addition to
          CS, he enjoys linguistics and graphic design.
        </div>
      </div>
      <div className="break"></div>

      <h2>Previous Contributors</h2>
      <div className="break"></div>
      <div>
        <a href="https://github.com/r0ckwav3">
          <img
            className="profilepic"
            src={petervandervelde}
            alt="Peter Vandervelde"
          />
        </a>
        <div className="name">Peter Vandervelde</div>
        <div className="bio">
          Peter is a High Schooler at Proof School who is interested in CS and
          Mathematics. His hobbies include acrobatics and digital drawing.
        </div>
      </div>
      <div>
        <a href="https://github.com/Angel-Shah">
          <img className="profilepic" src={angelshah} alt="Angel Shah" />
        </a>

        <div className="name">Angel Shah</div>
        <div className="bio">
          Angel is a sophomore studying Computer Engineering at the University
          of Waterloo. In his spare time, he loves learning piano and reading.{" "}
          <i class="fa fa-book"></i>
        </div>
      </div>
    </div>
  );
};

export default team;
