import React from "react";
import "./Team.css";

import juyoungchoi from "./images/juyoungchoi.jpg";
import aaronyu from "./images/aaronpfp.png";
import petervandervelde from "./images/peterpfp.png";
import angelshah from "./images/angelshah.jpg";
import illiaborzov from "./images/illiapfp.jpg";
import coleKissane from "./images/Cole.jpg";

const team = () => {
  return (
    <div className="team-page" style={{ overflowY: "auto" }}>
      <h2>Meet the Team</h2>
      <section className="team">
        <div className="item">
          <div className="box">
            <div className="profile-pic">
              <a href="https://github.com/aayu3">
                <img src={aaronyu} alt="Aaron Yu" />
              </a>
            </div>
            <div className="bio">
              <h4>Aaron Yu</h4>
              <p>
                Aaron is a Freshman at UIUC in Mathematics + Computer Science.
                In his spare time he enjoys playing with his cat and reading.
              </p>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="box">
            <div className="profile-pic">
              <a href="https://github.com/jchoi25">
                <img src={juyoungchoi} alt="Juyoung Choi" />
              </a>
            </div>
            <div className="bio">
              <h4>Juyoung Choi</h4>
              <p>
                Juyoung is a Freshman at UIUC majoring in Physics from South
                Korea. He enjoys observing the night sky and playing the guitar.
              </p>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="box">
            <div className="profile-pic">
              <a href="https://github.com/ckissane">
                <img src={coleKissane} alt="Cole Kissane" />
              </a>
            </div>
            <div className="bio">
              <h4>Cole Kissane</h4>
              <p>
                Cole is a upcoming Sophmore at Stanford majoring in Computer
                Science and Math. In addition to CS & Math, he enjoys physics
                and graphic design.
              </p>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="box">
            <div className="profile-pic">
              <a href="https://github.com/zer0key123">
                <img src={illiaborzov} alt="Illia Borzov" />
              </a>
            </div>
            <div className="bio">
              <h4>Illia Borzov</h4>
              <p>
                Illia is a freshman studying Computer Science at NYU. In
                addition to CS, he enjoys linguistics and graphic design.
              </p>
            </div>
          </div>
        </div>
      </section>

      <h2>Previous Contributors</h2>
      <section className="team">
        <div className="item">
          <div className="box">
            <div className="profile-pic">
              <a href="https://github.com/r0ckwav3">
                <img src={petervandervelde} alt="Peter Vandervelde" />
              </a>
            </div>

            <div className="bio">
              <h4>Peter Vandervelde</h4>
              <p>
                Peter is a High Schooler at Proof School who is interested in CS
                and Mathematics. His hobbies include acrobatics and digital
                drawing.
              </p>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="box">
            <div className="profile-pic">
              <a href="https://github.com/Angel-Shah">
                <img src={angelshah} alt="Angel Shah" />
              </a>
            </div>
            <div className="bio">
              <h4>Angel Shah</h4>
              <p>
                Angel is a sophomore studying Computer Engineering at the
                University of Waterloo. In his spare time, he loves learning
                piano and reading. <i class="fa fa-book"></i>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default team;
